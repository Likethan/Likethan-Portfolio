import React, { useEffect, useRef } from 'react';

/**
 * TemporalTimelineShader (Zero-Gravity Sacred Timeline & Emerald Mist):
 * - Deep obsidian-forest green (#030805) void
 * - Branching golden timeline threads (#D4AF37, #C5A059) weaving with Simplex curl noise
 * - Muted emerald and jade celestial mist ribbons (#059669, #064E3B)
 * - Fluid cursor velocity reaction (parting the timeline streams)
 * - Hyperdrive: surges golden timeline strands into high-speed temporal warp
 * - Ultra-optimized 60-120fps execution with bilinear hardware scaling and tab visibility pause
 */
export default function ZeroGravityShaderBackground({ className = '', hyperdrive = false }) {
  const canvasRef = useRef(null);
  const hyperdriveRef = useRef(hyperdrive);

  useEffect(() => {
    hyperdriveRef.current = hyperdrive;
  }, [hyperdrive]);

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
      uniform float uHyperdrive;

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

      // Fast 2-octave curl noise for timeline streams
      float fbm(vec3 p) {
        return 0.65 * snoise(p) + 0.35 * snoise(p * 2.15);
      }

      // Procedural micro-film grain
      float filmGrain(vec2 uv, float t) {
        return fract(sin(dot(uv + t * 0.05, vec2(12.9898, 78.233))) * 43758.5453) * 0.038;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

        // Timeline ascension: threads float upward through the loom
        float timeAscent = uTime * (0.14 + uHyperdrive * 0.45);
        vec2 flowCoords = p;
        flowCoords.y -= timeAscent;

        // Mouse velocity & cursor magnetic plasma reaction
        vec2 mPos = (uMouse * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        vec2 toMouse = p - mPos;
        float mDist = length(toMouse);
        float mouseImpulse = smoothstep(1.35, 0.0, mDist) * (0.55 + length(uMouseVelocity) * 2.4 + uHyperdrive * 1.5);

        // Disperse and weave golden timeline around cursor
        flowCoords += normalize(toMouse + vec2(0.0, -0.35)) * mouseImpulse * 0.32;

        // Branching Timeline Filaments & Streams
        float n1 = fbm(vec3(flowCoords * 1.25, uTime * (0.07 + uHyperdrive * 0.14)));
        float n2 = fbm(vec3(flowCoords * 2.4 + vec2(n1 * 0.45, -n1 * 0.45), uTime * (0.11 + uHyperdrive * 0.18)));

        // Golden sacred timeline threads (crisp, luminous filament lines)
        float timelineThread = sin(flowCoords.y * 4.2 + n2 * 4.5 + uTime * (0.22 + uHyperdrive * 0.4));
        timelineThread = smoothstep(0.72, 0.99, timelineThread) * (0.9 + uHyperdrive * 0.35);

        // Secondary branching timeline thread
        float branchThread = cos(flowCoords.x * 3.8 + n1 * 3.5 - uTime * 0.18);
        branchThread = smoothstep(0.78, 0.99, branchThread) * 0.55;

        // Color Palette:
        // Deep Forest-Obsidian Void (#030805)
        // Antique Gold (#D4AF37 / #C5A059)
        // Muted Emerald Jade (#059669 / #064E3B)
        // Radiant Gold Highlight (#FFF3B0)
        vec3 colorForestVoid = vec3(0.012, 0.031, 0.020); // #030805
        vec3 colorEmerald    = vec3(0.020, 0.588, 0.412); // #059669
        vec3 colorJadeDeep   = vec3(0.024, 0.306, 0.231); // #064E3B
        vec3 colorAntiqueGold= vec3(0.831, 0.686, 0.216); // #D4AF37
        vec3 colorGoldGlint  = vec3(1.000, 0.953, 0.690); // #FFF3B0

        // Emerald Mist backdrop
        float mistMask = smoothstep(-0.25, 0.65, n2) * (0.65 + uHyperdrive * 0.25);
        vec3 mistColor = mix(colorJadeDeep, colorEmerald, n1 * 0.5 + 0.5);

        // Mix void with emerald mist
        vec3 finalColor = mix(colorForestVoid, mistColor, mistMask * 0.4);

        // Weave Golden Timelines into the space
        vec3 goldStream = mix(colorAntiqueGold, colorGoldGlint, timelineThread * 0.7);
        finalColor += goldStream * timelineThread * 0.65;
        finalColor += colorAntiqueGold * branchThread * 0.35;

        // Cursor interactive golden aura & emerald ring
        finalColor += colorAntiqueGold * mouseImpulse * 0.22;
        finalColor += colorEmerald * mouseImpulse * 0.12;

        // Subtle micro-film grain
        float grain = filmGrain(uv, uTime);
        finalColor += grain;

        // Smooth radial vignette (shadowed perimeter)
        float vignette = 1.0 - smoothstep(0.4, 1.45, length(p * 0.8));
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
    const uHyperdriveLoc = gl.getUniformLocation(program, 'uHyperdrive');
    let hyperVal = 0.0;

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
      targetMouseY = window.innerHeight - e.clientY;
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
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const resize = () => {
      const scale = window.innerWidth < 768 ? 0.4 : 0.55;
      canvas.width = Math.max(320, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(240, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      velX *= 0.9;
      velY *= 0.9;

      const scale = window.innerWidth < 768 ? 0.4 : 0.55;
      const targetHyper = hyperdriveRef.current ? 1.0 : 0.0;
      hyperVal += (targetHyper - hyperVal) * 0.08;

      gl.uniform2f(uMouseLoc, mouseX * scale, mouseY * scale);
      gl.uniform2f(uMouseVelLoc, velX, velY);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uHyperdriveLoc, hyperVal);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
