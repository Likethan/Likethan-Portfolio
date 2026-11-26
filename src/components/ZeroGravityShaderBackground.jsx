import React, { useEffect, useRef } from 'react';

/**
 * ZeroGravityShaderBackground:
 * Pure WebGL Fragment Shader simulating antigravity physics:
 * - Deep obsidian (#09090D) void with kinetic crimson (#FF143D) and violet plasma glow
 * - Weightless fluid filaments & chromatic ribbon waves drifting upward against gravity
 * - 3D Simplex Curl noise & Brownian motion
 * - Responsive mouse velocity distortion & magnetic plasma dispersion
 * - Procedural micro-film grain & smooth vignette
 */
export default function ZeroGravityShaderBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    // Full screen triangle geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const vertexShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uMouseVelocity;

      // Simplex 3D noise primitives
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
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

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
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

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // Fractional Brownian Motion (fBm) with upward antigravity curl
      float fbm(vec3 p) {
        float f = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          f += amp * snoise(p * freq);
          freq *= 2.05;
          amp *= 0.48;
        }
        return f;
      }

      // Procedural micro-film grain
      float filmGrain(vec2 uv, float t) {
        return fract(sin(dot(uv + t * 0.05, vec2(12.9898, 78.233))) * 43758.5453) * 0.045;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

        // Antigravity drift coordinates: Y ascends continuously
        float timeAscent = uTime * 0.18;
        vec2 flowCoords = p;
        flowCoords.y -= timeAscent; // Upward antigravity flow

        // Mouse velocity & cursor magnetic plasma reaction
        vec2 mPos = (uMouse * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        vec2 toMouse = p - mPos;
        float mDist = length(toMouse);
        float mouseImpulse = smoothstep(1.4, 0.0, mDist) * (0.6 + length(uMouseVelocity) * 2.5);

        // Disperse and levitate upwards from cursor
        flowCoords += normalize(toMouse + vec2(0.0, -0.4)) * mouseImpulse * 0.35;

        // 3D Curl Noise Filaments
        float n1 = fbm(vec3(flowCoords * 1.3, uTime * 0.08));
        float n2 = fbm(vec3(flowCoords * 2.6 + vec2(n1 * 0.5, -n1 * 0.5), uTime * 0.12));

        // Chromatic ribbon waves
        float ribbon = sin(flowCoords.y * 3.5 + n2 * 4.0 + uTime * 0.25);
        ribbon = smoothstep(0.7, 0.98, ribbon) * 0.85;

        // Color Palette (#09090D base, #FF143D crimson accents, #7928CA violet glow)
        vec3 colorObsidian = vec3(0.035, 0.035, 0.051); // #09090D
        vec3 colorCrimson  = vec3(1.0, 0.078, 0.239);   // #FF143D
        vec3 colorViolet   = vec3(0.475, 0.157, 0.792);  // #7928CA
        vec3 colorCyanGlow = vec3(0.0, 0.96, 1.0);      // #00F5FF

        // Blend fluid filaments
        float plasmaMask = smoothstep(-0.25, 0.65, n2) * 0.7;
        vec3 plasmaColor = mix(colorViolet, colorCrimson, n1 * 0.5 + 0.5);

        // Add chromatic dispersion on ribbon edge
        plasmaColor += colorCyanGlow * ribbon * 0.5;

        vec3 finalColor = mix(colorObsidian, plasmaColor, plasmaMask * 0.45 + ribbon * 0.4);

        // Add mouse ambient plasma glow
        finalColor += colorCrimson * mouseImpulse * 0.18;
        finalColor += colorViolet * mouseImpulse * 0.12;

        // Micro-film grain
        float grain = filmGrain(uv, uTime);
        finalColor += grain;

        // Smooth radial vignette
        float vignette = 1.0 - smoothstep(0.4, 1.5, length(p * 0.8));
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const aPosLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uMouseVelLoc = gl.getUniformLocation(program, 'uMouseVelocity');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let velX = 0;
    let velY = 0;

    const onPointerMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY; // Flip Y for WebGL coords
      const dx = targetMouseX - lastMouseX;
      const dy = targetMouseY - lastMouseY;
      velX = dx / window.innerWidth;
      velY = dy / window.innerHeight;
      lastMouseX = targetMouseX;
      lastMouseY = targetMouseY;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let animationId;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      velX *= 0.92;
      velY *= 0.92;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      gl.uniform2f(uMouseLoc, mouseX * dpr, mouseY * dpr);
      gl.uniform2f(uMouseVelLoc, velX, velY);
      gl.uniform1f(uTimeLoc, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[-2] w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
