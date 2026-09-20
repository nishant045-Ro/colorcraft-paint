import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    p *= 1.5;

    float t = uTime * 0.055;

    // Domain warping for a flowing, liquid-paint look
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.6));
    vec2 r = vec2(
      fbm(p + 2.6 * q + vec2(1.7, 9.2) + t * 0.8),
      fbm(p + 2.6 * q + vec2(8.3, 2.8) - t * 0.45)
    );
    float f = fbm(p + 2.6 * r);

    // The whole blend is themed around the accent (currently selected paint color)
    vec3 c1 = uAccent;
    vec3 c2 = mix(uAccent, vec3(0.937, 0.267, 0.267), 0.6);
    vec3 c3 = mix(uAccent, vec3(0.231, 0.51, 0.965), 0.65);
    vec3 c4 = mix(uAccent, vec3(0.545, 0.361, 0.965), 0.55);
    vec3 c5 = mix(uAccent, vec3(0.078, 0.722, 0.651), 0.55);

    vec3 col = mix(c1, c2, clamp(f * 1.7 - 0.15, 0.0, 1.0));
    col = mix(col, c4, clamp(length(q) * 1.05, 0.0, 1.0));
    col = mix(col, c3, clamp(q.x * 0.85 + 0.15, 0.0, 1.0));
    col = mix(col, c5, clamp(r.y * 0.75 - 0.1, 0.0, 1.0));

    col *= 0.5 + 0.8 * f;

    // Soft glow following the pointer, tinted with the accent
    float d = length(p - uMouse * 1.5);
    col += mix(uAccent, vec3(1.0), 0.35) * 0.45 * exp(-d * 2.6);

    // Vignette so foreground content stays readable
    float vig = smoothstep(1.35, 0.25, length(p * 0.72));
    col *= 0.35 + 0.65 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`

function FluidPlane({ accent = '#f59e0b' }) {
  const material = useRef()
  const { viewport } = useThree()
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  const target = useRef(new THREE.Color(accent))

  useEffect(() => {
    target.current.set(accent)
  }, [accent])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAccent: { value: new THREE.Color(accent) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state, delta) => {
    const m = material.current
    if (!m) return
    m.uniforms.uTime.value = prefersReduced.current ? 12 : state.clock.elapsedTime
    m.uniforms.uResolution.value.set(state.size.width, state.size.height)
    m.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y)
    m.uniforms.uAccent.value.lerp(target.current, Math.min(1, delta * 2.5))
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export default function PaintBackground({ accent }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        className="!absolute inset-0"
      >
        <FluidPlane accent={accent} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />
    </div>
  )
}
