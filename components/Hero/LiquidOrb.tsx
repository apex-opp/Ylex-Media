\
"use client";

import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

const LiquidMat = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uColorA: new THREE.Color("#00E5FF"),
    uColorB: new THREE.Color("#FF2BD6"),
    uColorC: new THREE.Color("#B400FF"),
  },
  // vertex
  /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;

  uniform float uTime;
  uniform vec2 uMouse;

  // Simplex noise (2D/3D) — compact version
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857; // 1/7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;

    // mouse influence (subtle)
    float m = length(uMouse);
    vec3 p = position;

    // layered noise for liquid wobble
    float n1 = snoise(vec3(p * 1.25 + uTime * 0.35));
    float n2 = snoise(vec3(p * 2.25 - uTime * 0.22));
    float n3 = snoise(vec3(p * 4.00 + uTime * 0.12));

    float wobble = (n1 * 0.18 + n2 * 0.10 + n3 * 0.06);
    wobble += (uMouse.x * p.y - uMouse.y * p.x) * 0.06 * (0.4 + m);

    vec3 displaced = p + normal * wobble;

    vPos = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
  `,
  // fragment
  /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float fresnel(vec3 viewDir, vec3 normal, float power){
    return pow(1.0 - max(0.0, dot(viewDir, normal)), power);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPos);

    float f = fresnel(viewDir, normal, 2.4);

    // animated color drift
    float t = 0.5 + 0.5 * sin(uTime * 0.6 + vUv.x * 4.0);
    float t2 = 0.5 + 0.5 * cos(uTime * 0.42 + vUv.y * 5.0);

    vec3 base = mix(uColorA, uColorB, t);
    base = mix(base, uColorC, t2 * 0.55);

    // faux refraction using normal and uv shift
    vec2 shift = normal.xy * (0.08 + 0.05 * sin(uTime * 0.8));
    vec2 uv = vUv + shift;

    // holographic highlights
    float scan = 0.5 + 0.5 * sin((uv.y + uTime * 0.35) * 18.0);
    float glow = smoothstep(0.65, 1.0, scan) * 0.35;

    vec3 col = base;
    col += f * vec3(0.95);
    col += glow * vec3(0.7, 0.9, 1.0);

    float alpha = 0.92;
    gl_FragColor = vec4(col, alpha);
  }
  `
);

extend({ LiquidMat });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMat: any;
    }
  }
}

export default function LiquidOrb() {
  const mat = useRef<any>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.0, 64), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (mat.current) {
      mat.current.uTime = t;
      mat.current.uMouse.set(pointer.x, pointer.y);
      mat.current.uResolution.set(size.width, size.height);
    }
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.22;
      mesh.current.rotation.x = t * 0.14;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* refractive background plane */}
      <mesh position={[0, 0, -1.6]} scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={1}
          color="#070511"
        />
      </mesh>

      <mesh ref={mesh} geometry={geometry}>
        <liquidMat ref={mat} />
      </mesh>

      {/* soft rim glows */}
      <mesh scale={[2.25, 2.25, 2.25]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          transparent
          opacity={0.10}
          color={"#00E5FF"}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
