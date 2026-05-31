\
    import React, { useEffect, useMemo, useRef } from 'react'
    import * as THREE from 'three'
    import { Canvas, useFrame, useThree } from '@react-three/fiber'
    import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

    const vertexShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;

      float wave(vec2 p, float t) {
        float a = sin((p.x * 3.2 + t) * 1.1);
        float b = cos((p.y * 3.0 - t) * 1.2);
        float c = sin((p.x + p.y) * 3.6 + t * 0.8);
        return (a + b + c) / 3.0;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;

        // subtle mouse-driven field (uMouse is 0..1)
        vec2 m = (uMouse - 0.5) * 2.0;
        float md = length(uv - uMouse);
        float mouseInfluence = smoothstep(0.65, 0.0, md);

        float w = wave(pos.xy + m * 0.35, uTime * 0.55);
        pos.z += w * 0.16;
        pos.z += mouseInfluence * sin(uTime * 1.2 + (uv.x + uv.y) * 6.0) * 0.10;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;

      vec3 neonPalette(float x) {
        vec3 pink = vec3(1.0, 0.0, 0.498);
        vec3 lime = vec3(0.224, 1.0, 0.078);
        vec3 purple = vec3(0.616, 0.0, 1.0);
        vec3 orange = vec3(1.0, 0.369, 0.0);
        if (x < 0.25) return mix(pink, purple, x / 0.25);
        if (x < 0.50) return mix(purple, lime, (x - 0.25) / 0.25);
        if (x < 0.75) return mix(lime, orange, (x - 0.50) / 0.25);
        return mix(orange, pink, (x - 0.75) / 0.25);
      }

      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;

        // base void
        vec3 base = vec3(0.0196, 0.0039, 0.051); // ~ #05010d
        float t = uTime * 0.12;

        // soft moving bands
        float bands = sin((uv.x * 2.6 + t) * 6.283) * 0.25 + cos((uv.y * 2.1 - t) * 6.283) * 0.25;
        bands += sin((uv.x + uv.y) * 3.0 + t * 2.0) * 0.2;

        // mouse glow
        float md = distance(uv, uMouse);
        float glow = smoothstep(0.55, 0.0, md);
        float pulse = 0.65 + 0.35 * sin(uTime * 0.8);

        float n = hash(uv * 420.0 + uTime * 0.2) * 0.03;
        vec3 neon = neonPalette(fract(uv.x + uv.y * 0.7 + t));
        vec3 col = base;

        col += neon * (0.06 + bands * 0.05);
        col += neon * glow * 0.22 * pulse;
        col += vec3(n);

        // vignette
        float v = smoothstep(0.95, 0.35, distance(uv, vec2(0.5)));
        col *= v;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function FluidMesh() {
      const meshRef = useRef(null)
      const { viewport } = useThree()
      const mouse = useRef(new THREE.Vector2(0.5, 0.5))

      const uniforms = useMemo(
        () => ({
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        [],
      )

      useEffect(() => {
        const onMove = (e) => {
          const x = e.clientX / window.innerWidth
          const y = 1 - e.clientY / window.innerHeight
          mouse.current.set(x, y)
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
      }, [])

      useFrame((state, delta) => {
        uniforms.uTime.value += delta
        uniforms.uMouse.value.lerp(mouse.current, 0.12)
        if (meshRef.current) {
          // micro parallax
          meshRef.current.rotation.z = (uniforms.uMouse.value.x - 0.5) * 0.05
        }
      })

      const scale = useMemo(() => [viewport.width, viewport.height, 1], [viewport.width, viewport.height])

      return (
        <mesh ref={meshRef} scale={scale} position={[0, 0, 0]}>
          <planeGeometry args={[1, 1, 256, 256]} />
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent={false}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )
    }

    export default function Background3D() {
      return (
        <div className="fixed inset-0 -z-10">
          <Canvas
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            camera={{ position: [0, 0, 1.55], fov: 50, near: 0.1, far: 10 }}
          >
            <color attach="background" args={['#05010d']} />
            <ambientLight intensity={0.6} />
            <FluidMesh />
            <EffectComposer>
              <Bloom intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.85} />
              <Vignette eskil={false} offset={0.18} darkness={0.72} />
            </EffectComposer>
          </Canvas>
          <div className="pointer-events-none absolute inset-0 scanlines" />
        </div>
      )
    }
