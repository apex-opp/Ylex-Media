import { clamp } from "./utils";

/**
 * Minimal 3D wireframe renderer for Canvas 2D.
 * No WebGL dependencies; 60fps-friendly when used carefully.
 */

export function makeIcosahedron(radius = 1) {
  const t = (1 + Math.sqrt(5)) / 2;
  const s = radius / Math.sqrt(1 + t * t);

  const verts = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],

    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],

    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ].map(([x, y, z]) => [x * s, y * s, z * s]);

  // Edges for an icosahedron (index pairs)
  const edges = [
    [0, 1],
    [0, 5],
    [0, 7],
    [0, 10],
    [0, 11],
    [1, 5],
    [1, 7],
    [1, 8],
    [1, 9],
    [2, 3],
    [2, 4],
    [2, 6],
    [2, 10],
    [2, 11],
    [3, 4],
    [3, 6],
    [3, 8],
    [3, 9],
    [4, 5],
    [4, 9],
    [4, 11],
    [5, 9],
    [5, 11],
    [6, 7],
    [6, 8],
    [6, 10],
    [7, 8],
    [7, 10],
    [8, 9],
    [10, 11],
  ];

  return { verts, edges };
}

export function rotateXYZ([x, y, z], ax, ay, az) {
  // rotate around X
  let cy = Math.cos(ax), sy = Math.sin(ax);
  let ny = y * cy - z * sy;
  let nz = y * sy + z * cy;
  y = ny; z = nz;

  // rotate around Y
  let cx = Math.cos(ay), sx = Math.sin(ay);
  let nx = x * cx + z * sx;
  nz = -x * sx + z * cx;
  x = nx; z = nz;

  // rotate around Z
  let cz = Math.cos(az), sz = Math.sin(az);
  nx = x * cz - y * sz;
  ny = x * sz + y * cz;
  x = nx; y = ny;

  return [x, y, z];
}

export function project([x, y, z], { fov = 2.4, zOffset = 2.8 } = {}) {
  const dz = z + zOffset;
  const s = fov / dz;
  return [x * s, y * s, dz, s];
}

export function deformVerts(verts, amount = 0.12) {
  // deterministic-ish micro "glitch": small radial jitter
  return verts.map(([x, y, z]) => {
    const jx = (Math.random() - 0.5) * amount;
    const jy = (Math.random() - 0.5) * amount;
    const jz = (Math.random() - 0.5) * amount;
    return [x + jx, y + jy, z + jz];
  });
}

export function drawWireframe(ctx, mesh, opts) {
  const {
    w,
    h,
    ax,
    ay,
    az,
    stroke = "rgba(11,16,32,0.52)",
    glow = "rgba(0,210,255,0.16)",
    dot = "rgba(0,210,255,0.42)",
    lineWidth = 1.25,
    scale = 0.86,
  } = opts;

  const cx = w / 2;
  const cy = h / 2;

  // background fade is done by caller; keep this function pure.
  ctx.save();
  ctx.translate(cx, cy);

  // nice crispness on standard DPR
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = stroke;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const pts = mesh.verts.map((v) => rotateXYZ(v, ax, ay, az)).map((v) => project(v));
  const minDim = Math.min(w, h);

  const toScreen = (p) => {
    const [px, py, dz, s] = p;
    const sx = px * (minDim * scale);
    const sy = py * (minDim * scale);
    return [sx, sy, dz, s];
  };

  const spts = pts.map(toScreen);

  // simple depth sort for edges: draw far first
  const edges = mesh.edges
    .map(([a, b]) => {
      const da = spts[a][2];
      const db = spts[b][2];
      return { a, b, z: (da + db) / 2 };
    })
    .sort((e1, e2) => e2.z - e1.z);

  for (const e of edges) {
    const A = spts[e.a];
    const B = spts[e.b];
    ctx.beginPath();
    ctx.moveTo(A[0], A[1]);
    ctx.lineTo(B[0], B[1]);
    ctx.stroke();
  }

  // vertex dots (cheap but effective)
  ctx.shadowBlur = 0;
  ctx.fillStyle = dot;
  for (const p of spts) {
    const r = clamp(2.4 * p[3] * 1.6, 1.0, 2.2);
    ctx.beginPath();
    ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
