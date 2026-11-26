import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cyberAudio } from '../utils/cyberAudio';
import { Sparkles, Zap, Flame, Compass, Eye, RefreshCw, Orbit } from 'lucide-react';

/**
 * World-Class Antigravity & Celestial Physics Engine:
 * - 3,400 Volumetric celestial stars:
 *   1. Ambient micro-dust (twinkling starfield)
 *   2. Volumetric glowing plasma orbs (hot white nucleus, chromatic corona)
 *   3. Brilliant supernova diamond stars with rotating 8-point lens flare diffraction spikes
 * - 3D Curl Noise flow streamlines & zero-gravity buoyancy
 * - Dynamic Neural Laser Filaments connecting star constellations
 * - Cursor Magnetic Wake & Bioluminescent disturbance
 * - Click & Hold: Gravitational Singularity (Black Hole accretion disk)
 * - Release / Trigger: Supernova Starburst detonation with chromatic shockwaves
 * - Real-time Palette Morpher (Crimson Void, Electric Cyber, Solar Supernova, Deep Aurora)
 * - Interactive HUD with trigger buttons & status telemetry
 */

const PALETTES = {
  crimson: {
    name: 'Crimson Void',
    primary: 0xff143d,
    secondary: 0xff4b6e,
    accent: 0x9d00ff,
    highlight: 0x00f5ff,
    rim: 0xff143d,
    secRim: 0x9d00ff,
    label: 'CRIMSON_VOID',
  },
  cyber: {
    name: 'Electric Cyber',
    primary: 0x00f5ff,
    secondary: 0x00b4d8,
    accent: 0xff007f,
    highlight: 0xffffff,
    rim: 0x00f5ff,
    secRim: 0xff007f,
    label: 'CYBER_NEON',
  },
  solar: {
    name: 'Solar Supernova',
    primary: 0xffb703,
    secondary: 0xfb8500,
    accent: 0xff2a2a,
    highlight: 0xfff3b0,
    rim: 0xffb703,
    secRim: 0xfb8500,
    label: 'SOLAR_CORE',
  },
  aurora: {
    name: 'Deep Aurora',
    primary: 0x00f5d4,
    secondary: 0x06d6a0,
    accent: 0x7b2cbf,
    highlight: 0xffffff,
    rim: 0x00f5d4,
    secRim: 0x7b2cbf,
    label: 'AURORA_BOREALIS',
  },
};

export default function AntigravityCanvas({ className = '', hyperdrive = false }) {
  const mountRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState('crimson');
  const [hudOpen, setHudOpen] = useState(false);
  const [singularityActive, setSingularityActive] = useState(false);
  const triggerSupernovaRef = useRef(null);
  const toggleSingularityRef = useRef(null);
  const updateColorsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.024);

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Interaction & Physics State ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      lastX: 0,
      lastY: 0,
      speed: 0,
      worldPos: new THREE.Vector3(0, 0, 0),
      isDown: false,
      holdDuration: 0,
      forceSingularity: false,
    };

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    const shockwaves = [];
    const shockwaveVisuals = [];

    // --- Supernova Trigger Helper ---
    const createSupernovaBurst = (customCenter = null, isMega = true) => {
      const center = customCenter || mouse.worldPos.clone();
      cyberAudio.playWarpDrive(true);
      cyberAudio.playShockwave();

      shockwaves.push({
        center: center.clone(),
        radius: 0.1,
        maxRadius: isMega ? 28.0 : 18.0,
        speed: isMega ? 26.0 : 18.0,
        strength: isMega ? 5.0 : 3.0,
        life: 1.0,
      });

      // 3D Expanding Shockwave Visual Ring
      const ringGeo = new THREE.RingGeometry(0.1, isMega ? 0.8 : 0.45, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: PALETTES[activeTheme]?.primary || 0xff143d,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(center);
      ringMesh.lookAt(camera.position);
      scene.add(ringMesh);

      shockwaveVisuals.push({
        mesh: ringMesh,
        scale: 1,
        opacity: 0.95,
      });
    };

    triggerSupernovaRef.current = () => {
      createSupernovaBurst(new THREE.Vector3(0, 0, 0), true);
    };

    toggleSingularityRef.current = () => {
      mouse.forceSingularity = !mouse.forceSingularity;
      setSingularityActive(mouse.forceSingularity);
      if (mouse.forceSingularity) {
        cyberAudio.playLaser();
      } else {
        createSupernovaBurst(new THREE.Vector3(0, 0, 0), true);
      }
    };

    // --- Pointer Listeners ---
    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNorm.set(mouse.targetX, mouse.targetY);

      const dx = mouse.targetX - mouse.lastX;
      const dy = mouse.targetY - mouse.lastY;
      mouse.vx = dx * 60;
      mouse.vy = dy * 60;
      mouse.speed = Math.sqrt(dx * dx + dy * dy) * 60;
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;

      raycaster.setFromCamera(mouseNorm, camera);
      raycaster.ray.intersectPlane(planeZ, mouse.worldPos);
    };

    const onPointerDown = (e) => {
      if (e.target.closest('button, a, input, textarea, select, .interactive, .hud-panel')) return;
      mouse.isDown = true;
      mouse.holdDuration = 0;
      cyberAudio.playHapticClick();
    };

    const onPointerUp = (e) => {
      if (!mouse.isDown) return;
      mouse.isDown = false;
      const isSupernova = mouse.holdDuration > 0.3;
      createSupernovaBurst(mouse.worldPos, isSupernova);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // --- 1. VOLUMETRIC CELESTIAL STARDUST PARTICLES (3,400 Stars) ---
    const PARTICLE_COUNT = 3400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const flareTypes = new Float32Array(PARTICLE_COUNT); // 0 = soft orb, 1 = 4-point flare, 2 = 8-point diamond star
    const flareSeeds = new Float32Array(PARTICLE_COUNT);
    const twinkleSpeeds = new Float32Array(PARTICLE_COUNT);

    // Palette generator function
    const applyPalette = (themeKey) => {
      const p = PALETTES[themeKey] || PALETTES.crimson;
      const cPrimary = new THREE.Color(p.primary);
      const cSecondary = new THREE.Color(p.secondary);
      const cAccent = new THREE.Color(p.accent);
      const cHighlight = new THREE.Color(p.highlight);
      const cWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const rand = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
        const absRand = Math.abs(rand);

        const pColor = new THREE.Color();
        if (absRand < 0.42) {
          pColor.lerpColors(cPrimary, cSecondary, Math.abs(Math.sin(i)));
        } else if (absRand < 0.72) {
          pColor.lerpColors(cAccent, cHighlight, Math.abs(Math.cos(i)));
        } else if (absRand < 0.88) {
          pColor.lerpColors(cPrimary, cAccent, 0.5);
        } else {
          pColor.copy(cWhite);
        }

        colors[idx] = pColor.r;
        colors[idx + 1] = pColor.g;
        colors[idx + 2] = pColor.b;
      }

      if (particleGeo.attributes.color) {
        particleGeo.attributes.color.needsUpdate = true;
      }
    };

    updateColorsRef.current = applyPalette;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      // Cylindrical volumetric field with rich Z-depth
      const radius = Math.random() * 17.5 + 1.2;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 28;

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = (Math.random() - 0.5) * 18 - 1.5;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      basePositions[idx] = x;
      basePositions[idx + 1] = y;
      basePositions[idx + 2] = z;

      velocities[idx] = 0;
      velocities[idx + 1] = Math.random() * 0.022 + 0.012; // upward antigravity lift
      velocities[idx + 2] = 0;

      // Tiered particle types:
      // 10% 8-point rotating diamond starburst (huge, radiant)
      // 22% 4-point cardinal lens flare spikes (prominent)
      // 68% soft volumetric glowing plasma orbs (volumetric halo)
      const starRand = Math.random();
      if (starRand < 0.1) {
        flareTypes[i] = 2.0;
        scales[i] = Math.random() * 3.5 + 4.0; // 60px - 110px
      } else if (starRand < 0.32) {
        flareTypes[i] = 1.0;
        scales[i] = Math.random() * 2.2 + 2.5; // 35px - 65px
      } else {
        flareTypes[i] = 0.0;
        scales[i] = Math.random() * 1.6 + 1.2; // 18px - 35px
      }

      phases[i] = Math.random() * Math.PI * 2;
      flareSeeds[i] = Math.random() * Math.PI * 2;
      twinkleSpeeds[i] = Math.random() * 2.5 + 1.5;
    }

    applyPalette(activeTheme);

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    particleGeo.setAttribute('flareType', new THREE.BufferAttribute(flareTypes, 1));
    particleGeo.setAttribute('flareSeed', new THREE.BufferAttribute(flareSeeds, 1));
    particleGeo.setAttribute('twinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));

    // Next-Gen Volumetric Celestial Particle Shader
    const particleShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
        uHyperdrive: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uHyperdrive;
        attribute float scale;
        attribute float flareType;
        attribute float flareSeed;
        attribute float twinkleSpeed;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlare;
        varying float vFlareSeed;

        void main() {
          vColor = color;
          vFlare = flareType;
          vFlareSeed = flareSeed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Distance fade & shimmering pulsation
          float distToCam = -mvPosition.z;
          float pulse = sin(uTime * twinkleSpeed + flareSeed) * 0.22 + 0.88;
          vAlpha = smoothstep(28.0, 2.8, distToCam) * pulse * (1.0 + uHyperdrive * 0.5);

          // Volumetric screen scale
          float sizeMultiplier = scale * (115.0 / distToCam) * uPixelRatio;
          gl_PointSize = sizeMultiplier * (1.0 + uHyperdrive * 1.4);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlare;
        varying float vFlareSeed;
        uniform float uTime;
        uniform float uHyperdrive;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // 1. Soft volumetric Gaussian corona glow
          float glow = exp(-dist * dist * 11.0) * 0.85;

          // 2. High-intensity luminous plasma nucleus
          float core = exp(-dist * 26.0) * 2.3;

          // 3. Chromatic dispersion halo
          float halo = smoothstep(0.44, 0.30, dist) * smoothstep(0.16, 0.30, dist) * 0.65;

          // 4. Rotating Celestial Star Diffraction Spikes
          float crossFlare = 0.0;
          if (vFlare > 0.5) {
            float angle = uTime * 0.4 + vFlareSeed;
            float ca = cos(angle);
            float sa = sin(angle);
            vec2 rCoord = vec2(coord.x * ca - coord.y * sa, coord.x * sa + coord.y * ca);

            // Primary 4-point cross spikes
            float s1 = max(0.0, 1.0 - abs(rCoord.x) * 16.0) * max(0.0, 1.0 - abs(rCoord.y) * 2.6);
            float s2 = max(0.0, 1.0 - abs(rCoord.y) * 16.0) * max(0.0, 1.0 - abs(rCoord.x) * 2.6);
            crossFlare = (s1 + s2) * 1.5;

            // Secondary 45-degree spikes for 8-point diamond stars
            if (vFlare > 1.5) {
              vec2 dCoord = vec2(rCoord.x * 0.7071 - rCoord.y * 0.7071, rCoord.x * 0.7071 + rCoord.y * 0.7071);
              float d1 = max(0.0, 1.0 - abs(dCoord.x) * 22.0) * max(0.0, 1.0 - abs(dCoord.y) * 3.5);
              float d2 = max(0.0, 1.0 - abs(dCoord.y) * 22.0) * max(0.0, 1.0 - abs(dCoord.x) * 3.5);
              crossFlare += (d1 + d2) * 0.75;
            }
          }

          float totalIntensity = glow + core + crossFlare + halo;

          // Hot celestial white center transition
          vec3 hotWhite = vec3(1.0, 0.99, 0.96);
          vec3 finalColor = mix(vColor * (1.7 + uHyperdrive * 1.3), hotWhite, clamp(core * 0.75 + crossFlare * 0.5, 0.0, 1.0));

          gl_FragColor = vec4(finalColor, clamp(totalIntensity * vAlpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(particleGeo, particleShaderMat);
    scene.add(particleSystem);

    // --- 2. DYNAMIC NEURAL LASER FILAMENTS ---
    const MAX_LINE_POINTS = 380;
    const linePositions = new Float32Array(MAX_LINE_POINTS * 2 * 3);
    const lineColors = new Float32Array(MAX_LINE_POINTS * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // --- 3. FLOATING OBSIDIAN CRYSTALS WITH FRESNEL RIM ---
    const currentPal = PALETTES[activeTheme] || PALETTES.crimson;
    const crystalShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(0x07080c) },
        uRimColor: { value: new THREE.Color(currentPal.rim) },
        uSecondaryRim: { value: new THREE.Color(currentPal.secRim) },
        uFresnelPower: { value: 1.8 },
        uHyperdrive: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uBaseColor;
        uniform vec3 uRimColor;
        uniform vec3 uSecondaryRim;
        uniform float uFresnelPower;
        uniform float uHyperdrive;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
          float rimMix = sin(vWorldPosition.y * 0.9 + vWorldPosition.x * 0.6) * 0.5 + 0.5;
          vec3 rimFinal = mix(uRimColor, uSecondaryRim, rimMix) * (2.2 + uHyperdrive * 1.5);

          vec3 finalColor = uBaseColor + (rimFinal * fresnel);
          gl_FragColor = vec4(finalColor, 0.96);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const crystals = [];
    const crystalGeos = [
      new THREE.OctahedronGeometry(1.25, 0),
      new THREE.IcosahedronGeometry(1.05, 0),
      new THREE.DodecahedronGeometry(0.9, 0),
    ];

    for (let i = 0; i < 12; i++) {
      const geo = crystalGeos[i % crystalGeos.length];
      const mesh = new THREE.Mesh(geo, crystalShaderMat.clone());

      const startX = (Math.random() - 0.5) * 22;
      const startY = (Math.random() - 0.5) * 16;
      const startZ = (Math.random() - 0.5) * 8 - 1.2;

      mesh.position.set(startX, startY, startZ);
      const scale = Math.random() * 0.45 + 0.35;
      mesh.scale.set(scale, scale, scale);

      crystals.push({
        mesh,
        basePos: new THREE.Vector3(startX, startY, startZ),
        currentPos: new THREE.Vector3(startX, startY, startZ),
        velocity: new THREE.Vector3(0, 0, 0),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.018,
          (Math.random() - 0.5) * 0.018,
          (Math.random() - 0.5) * 0.018
        ),
        floatSpeed: Math.random() * 0.014 + 0.007,
        phase: Math.random() * Math.PI * 2,
      });

      scene.add(mesh);
    }

    // --- Resize Handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      particleShaderMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.75);
    };

    window.addEventListener('resize', onResize);

    // --- Physics & Render Loop ---
    const clock = new THREE.Clock();
    let frameId;
    let hyperVal = 0.0;

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // Track mouse hold duration
      if (mouse.isDown || mouse.forceSingularity) {
        mouse.holdDuration += dt;
      }

      // Smooth Hyperdrive
      const targetHyper = hyperdrive ? 1.0 : 0.0;
      hyperVal += (targetHyper - hyperVal) * 0.08;
      particleShaderMat.uniforms.uHyperdrive.value = hyperVal;

      // Camera lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      camera.position.x += (mouse.x * 1.3 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      particleShaderMat.uniforms.uTime.value = time;

      // Update Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed * dt;
        sw.life = 1.0 - sw.radius / sw.maxRadius;
        if (sw.life <= 0) {
          shockwaves.splice(s, 1);
        }
      }

      // Update Shockwave Rings
      for (let v = shockwaveVisuals.length - 1; v >= 0; v--) {
        const ring = shockwaveVisuals[v];
        ring.scale += 32.0 * dt;
        ring.mesh.scale.set(ring.scale, ring.scale, 1);
        ring.opacity *= 0.93;
        ring.mesh.material.opacity = ring.opacity;
        if (ring.opacity <= 0.01) {
          scene.remove(ring.mesh);
          ring.mesh.geometry.dispose();
          ring.mesh.material.dispose();
          shockwaveVisuals.splice(v, 1);
        }
      }

      // 1. UPDATE PARTICLES WITH 3D CURL NOISE & GRAVITATIONAL SINGULARITY
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;
      const speedMult = 1.0 + hyperVal * 4.5;
      const isSingularityActive = mouse.isDown || mouse.forceSingularity;
      const vortexCenter = mouse.forceSingularity ? new THREE.Vector3(0, 0, 0) : mouse.worldPos;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        let px = posArray[idx];
        let py = posArray[idx + 1];
        let pz = posArray[idx + 2];

        // Antigravity Upward Ascension
        py += velocities[idx + 1] * speedMult;

        // 3D Curl Noise flow streamlines
        const ph = phases[i];
        const streamX = Math.sin(time * 0.55 + ph + py * 0.22) * 0.022 * (1.0 + hyperVal * 2.0);
        const streamZ = Math.cos(time * 0.45 + ph + px * 0.22) * 0.018;
        px += streamX;
        pz += streamZ;

        // Boundary wrap
        if (py > 14.0) {
          py = -14.0;
          px = (Math.random() - 0.5) * 34;
          pz = (Math.random() - 0.5) * 18 - 1.5;
        }

        const dx = px - vortexCenter.x;
        const dy = py - vortexCenter.y;
        const dz = pz - vortexCenter.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // A. GRAVITATIONAL SINGULARITY (Vortex pull + angular swirl)
        if (isSingularityActive && distSq < 72.0) {
          const dist = Math.sqrt(distSq) || 0.001;
          const pull = (1.0 - dist / 8.5) * (1.4 + mouse.holdDuration * 2.2);
          // Inward accretion pull
          px -= (dx / dist) * pull * 0.48;
          py -= (dy / dist) * pull * 0.48;
          // Angular orbital swirl
          px += (-dy / dist) * pull * 0.38;
          py += (dx / dist) * pull * 0.38;
        }
        // B. BIOLUMINESCENT WAKE & REPULSION (Hover)
        else if (distSq < 18.0) {
          const dist = Math.sqrt(distSq) || 0.001;
          const force = (1.0 - dist / 4.2) * (0.85 + mouse.speed * 0.45);
          px += (dx / dist) * force * 0.42;
          py += (dy / dist) * force * 0.42 + force * 0.22; // upward levitation
          pz += (dz / dist) * force * 0.25;
        }

        // C. ACTIVE SHOCKWAVE EXPULSION
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const swDx = px - sw.center.x;
          const swDy = py - sw.center.y;
          const swDz = pz - sw.center.z;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy + swDz * swDz);
          const waveDelta = Math.abs(swDist - sw.radius);

          if (waveDelta < 2.8) {
            const waveForce = (1.0 - waveDelta / 2.8) * sw.strength * sw.life;
            px += (swDx / (swDist || 1)) * waveForce * 0.95;
            py += (swDy / (swDist || 1)) * waveForce * 0.95;
            pz += (swDz / (swDist || 1)) * waveForce * 0.95;
          }
        }

        posArray[idx] = px;
        posArray[idx + 1] = py;
        posArray[idx + 2] = pz;
      }

      posAttr.needsUpdate = true;

      // 2. UPDATE NEURAL LASER FILAMENTS (Connect prominent stars)
      const linePosAttr = lineGeo.attributes.position;
      const linePosArray = linePosAttr.array;
      const lineColorAttr = lineGeo.attributes.color;
      const lineColorArray = lineColorAttr.array;

      let lineIdx = 0;
      const maxConnectDist = 3.8;

      // Connect stars dynamically
      for (let i = 0; i < 75 && lineIdx < MAX_LINE_POINTS; i++) {
        const iIdx = i * 3;
        const x1 = posArray[iIdx];
        const y1 = posArray[iIdx + 1];
        const z1 = posArray[iIdx + 2];

        for (let j = i + 1; j < 75 && lineIdx < MAX_LINE_POINTS; j++) {
          const jIdx = j * 3;
          const x2 = posArray[jIdx];
          const y2 = posArray[jIdx + 1];
          const z2 = posArray[jIdx + 2];

          const dSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
          if (dSq < maxConnectDist * maxConnectDist) {
            const pIndex = lineIdx * 6;
            linePosArray[pIndex] = x1;
            linePosArray[pIndex + 1] = y1;
            linePosArray[pIndex + 2] = z1;
            linePosArray[pIndex + 3] = x2;
            linePosArray[pIndex + 4] = y2;
            linePosArray[pIndex + 5] = z2;

            const alpha = 1.0 - Math.sqrt(dSq) / maxConnectDist;
            lineColorArray[pIndex] = 1.0 * alpha;
            lineColorArray[pIndex + 1] = 0.08 * alpha;
            lineColorArray[pIndex + 2] = 0.25 * alpha;
            lineColorArray[pIndex + 3] = 0.0;
            lineColorArray[pIndex + 4] = 0.96 * alpha;
            lineColorArray[pIndex + 5] = 1.0 * alpha;

            lineIdx++;
          }
        }
      }

      lineGeo.setDrawRange(0, lineIdx * 2);
      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      // 3. UPDATE FLOATING OBSIDIAN CRYSTALS WITH SPRING DAMPING
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        const mesh = c.mesh;

        c.basePos.y += c.floatSpeed * speedMult;
        if (c.basePos.y > 11.0) {
          c.basePos.y = -11.0;
          c.basePos.x = (Math.random() - 0.5) * 22;
        }

        const targetPos = new THREE.Vector3(
          c.basePos.x + Math.sin(time * 0.7 + c.phase) * 0.35,
          c.basePos.y + Math.sin(time * 1.3 + c.phase) * 0.45,
          c.basePos.z
        );

        // Repel from mouse
        const toMouse = new THREE.Vector3().subVectors(c.currentPos, mouse.worldPos);
        const mouseDist = toMouse.length();
        if (mouseDist < 4.8) {
          const repelForce = (1.0 - mouseDist / 4.8) * 3.0;
          toMouse.normalize().multiplyScalar(repelForce);
          targetPos.add(toMouse);
          targetPos.y += repelForce * 0.5;
        }

        // Shockwaves impact crystals
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const toSw = new THREE.Vector3().subVectors(c.currentPos, sw.center);
          const swDist = toSw.length();
          if (Math.abs(swDist - sw.radius) < 2.8) {
            const swImpact = sw.strength * sw.life * 2.4;
            toSw.normalize().multiplyScalar(swImpact);
            c.velocity.add(toSw);
          }
        }

        // Spring integration (stiffness 120, damping 14)
        const displacement = new THREE.Vector3().subVectors(targetPos, c.currentPos);
        const springForce = displacement.multiplyScalar(120 * dt * 0.045);
        c.velocity.add(springForce);
        c.velocity.multiplyScalar(Math.max(0, 1 - 14 * dt * 0.35));
        c.currentPos.add(c.velocity);

        mesh.position.copy(c.currentPos);

        mesh.rotation.x += c.rotSpeed.x * (1.0 + hyperVal * 3.0) + c.velocity.y * 0.05;
        mesh.rotation.y += c.rotSpeed.y * (1.0 + hyperVal * 3.0) + c.velocity.x * 0.05;
        mesh.rotation.z += c.rotSpeed.z;

        mesh.material.uniforms.uTime.value = time;
        mesh.material.uniforms.uHyperdrive.value = hyperVal;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      particleGeo.dispose();
      particleShaderMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      crystalGeos.forEach((g) => g.dispose());
      crystalShaderMat.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hyperdrive]);

  // Handle Palette Switch
  const switchTheme = (themeKey) => {
    cyberAudio.playLaser();
    setActiveTheme(themeKey);
    if (updateColorsRef.current) {
      updateColorsRef.current(themeKey);
    }
  };

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        className={`fixed inset-0 pointer-events-auto z-0 overflow-hidden cursor-crosshair ${className}`}
        title="Click for shockwave • Hold for gravitational black hole • Move for fluid vortex"
      />

      {/* Floating Interactive Celestial HUD (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto hud-panel">
        {/* Expanded Panel */}
        {hudOpen && (
          <div className="glass-panel p-4 rounded-2xl w-72 mb-2 border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff143d]" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  PARTICLE_ENGINE // V3.8
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                3,400 STARS
              </span>
            </div>

            {/* Theme Selector */}
            <div className="mt-3">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Cosmic Spectral Palette
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(PALETTES).map(([key, pal]) => (
                  <button
                    key={key}
                    onClick={() => switchTheme(key)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-all flex items-center gap-2 border ${
                      activeTheme === key
                        ? 'bg-white/15 border-white/40 text-white shadow-sm'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: `#${pal.primary.toString(16).padStart(6, '0')}` }}
                    />
                    <span className="truncate">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kinetic Physics Actions */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Antigravity Physics FX
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => triggerSupernovaRef.current && triggerSupernovaRef.current()}
                  className="px-2.5 py-2 rounded-lg bg-[#ff143d]/20 hover:bg-[#ff143d]/30 border border-[#ff143d]/40 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,20,61,0.2)] active:scale-95"
                >
                  <Flame className="w-3.5 h-3.5 text-[#ff143d]" />
                  Supernova
                </button>
                <button
                  onClick={() => toggleSingularityRef.current && toggleSingularityRef.current()}
                  className={`px-2.5 py-2 rounded-lg border text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                    singularityActive
                      ? 'bg-purple-600/40 border-purple-400 text-white shadow-[0_0_15px_rgba(157,0,255,0.4)]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                  }`}
                >
                  <Orbit className={`w-3.5 h-3.5 ${singularityActive ? 'text-purple-300 animate-spin' : 'text-slate-400'}`} />
                  {singularityActive ? 'Singularity ON' : 'Singularity'}
                </button>
              </div>
            </div>

            {/* Instruction Tip */}
            <p className="mt-3 text-[10px] font-mono text-slate-400 leading-relaxed border-t border-white/5 pt-2">
              💡 <span className="text-slate-300">Click</span> to shockwave, <span className="text-slate-300">hold</span> to collapse into black hole, or <span className="text-slate-300">move</span> cursor for fluid vortex.
            </p>
          </div>
        )}

        {/* Collapsed Toggle Button Pill */}
        <button
          onClick={() => {
            cyberAudio.playHapticClick();
            setHudOpen(!hudOpen);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel border border-white/15 bg-black/50 hover:bg-black/70 hover:border-white/30 text-slate-200 text-xs font-mono shadow-xl transition-all hover:scale-105 active:scale-95 group"
          title="Toggle Particle Physics Engine Controls"
        >
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{
              backgroundColor: `#${(PALETTES[activeTheme]?.primary || 0xff143d).toString(16).padStart(6, '0')}`,
            }}
          />
          <span className="font-semibold tracking-wider text-[11px] group-hover:text-white">
            PARTICLES: {PALETTES[activeTheme]?.name.toUpperCase()}
          </span>
          <RefreshCw className={`w-3 h-3 text-slate-400 group-hover:text-white transition-transform ${hudOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </>
  );
}
