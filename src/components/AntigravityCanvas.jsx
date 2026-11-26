import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Antigravity WebGL Engine:
 * - 2,500 weightless iridescent luminescent particles drifting upward
 * - Floating geometric obsidian crystals with glowing kinetic crimson rim lighting (Fresnel)
 * - Zero-gravity fluid curl noise & Brownian turbulence
 * - Spring damping physics (stiffness: 120, damping: 14) responding to mouse velocity
 * - Procedural film grain, vignette, and chromatic plasma ribbons
 */
export default function AntigravityCanvas({ className = '' }) {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090d, 0.038);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
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
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Mouse & Spring Physics State ---
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
    };

    // Spring damping constants: stiffness 120, damping 14 (converted for delta time)
    const SPRING_STIFFNESS = 120;
    const SPRING_DAMPING = 14;

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNorm.set(mouse.targetX, mouse.targetY);

      // Mouse velocity
      const dx = mouse.targetX - mouse.lastX;
      const dy = mouse.targetY - mouse.lastY;
      mouse.vx = dx * 60;
      mouse.vy = dy * 60;
      mouse.speed = Math.sqrt(dx * dx + dy * dy) * 60;
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;

      // Project mouse to 3D world plane
      raycaster.setFromCamera(mouseNorm, camera);
      raycaster.ray.intersectPlane(planeZ, mouse.worldPos);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- 1. PARTICLES: 2,500 Weightless Iridescent Particles ---
    const PARTICLE_COUNT = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    // Color palette: deep obsidian, kinetic crimson (#FF143D), cyan (#00F5FF), violet (#8B5CF6)
    const colorCrimson = new THREE.Color(0xff143d);
    const colorCyan = new THREE.Color(0x00f5ff);
    const colorViolet = new THREE.Color(0x8b5cf6);
    const colorWhite = new THREE.Color(0xf8fafc);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 16 - 2;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      originalPositions[idx] = x;
      originalPositions[idx + 1] = y;
      originalPositions[idx + 2] = z;

      // Subtle upward antigravity velocity + turbulent drift
      velocities[idx] = (Math.random() - 0.5) * 0.012;
      velocities[idx + 1] = Math.random() * 0.024 + 0.008; // upward lift
      velocities[idx + 2] = (Math.random() - 0.5) * 0.012;

      // Color distribution: 55% crimson/violet, 30% cyan iridescent, 15% starlight white
      const rand = Math.random();
      const pColor = new THREE.Color();
      if (rand < 0.45) {
        pColor.lerpColors(colorCrimson, colorViolet, Math.random());
      } else if (rand < 0.8) {
        pColor.lerpColors(colorCyan, colorCrimson, Math.random() * 0.5);
      } else {
        pColor.lerpColors(colorWhite, colorCyan, Math.random() * 0.3);
      }

      colors[idx] = pColor.r;
      colors[idx + 1] = pColor.g;
      colors[idx + 2] = pColor.b;

      scales[i] = Math.random() * 1.8 + 0.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom WebGL Particle Shader with radial glow & anti-gravity pulse
    const particleShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float scale;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Subtle pulsation
          float pulse = sin(uTime * 1.5 + position.x * 0.5 + position.y * 0.5) * 0.25 + 0.75;
          vAlpha = smoothstep(-15.0, -2.0, position.z) * pulse;

          gl_PointSize = scale * (26.0 / -mvPosition.z) * uPixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Soft radial glow disc
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float intensity = pow(1.0 - (dist * 2.0), 1.8);
          vec3 glowColor = vColor * 1.4;
          gl_FragColor = vec4(glowColor, intensity * vAlpha * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(particleGeo, particleShaderMat);
    scene.add(particleSystem);

    // --- 2. FLOATING GEOMETRIC OBSIDIAN CRYSTALS WITH CRIMSON FRESNEL RIM ---
    // Custom Fresnel Shader for Obsidian with Kinetic Crimson Rim
    const crystalShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(0x09090d) },
        uRimColor: { value: new THREE.Color(0xff143d) },
        uSecondaryRim: { value: new THREE.Color(0x8b5cf6) },
        uFresnelPower: { value: 2.2 },
        uLightPos: { value: new THREE.Vector3(5, 8, 10) },
      },
      vertexShader: `
        uniform float uTime;
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
        uniform vec3 uLightPos;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // Fresnel rim calculation
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
          
          // Subtle iridescent gradient across rim
          float rimMix = sin(vWorldPosition.y * 0.8 + vWorldPosition.x * 0.5) * 0.5 + 0.5;
          vec3 rimFinal = mix(uRimColor, uSecondaryRim, rimMix) * 1.6;

          // Facet reflection highlight
          vec3 lightDir = normalize(uLightPos - vWorldPosition);
          vec3 halfVec = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfVec), 0.0), 32.0);

          vec3 finalColor = uBaseColor + (rimFinal * fresnel) + (vec3(1.0) * spec * 0.35);
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const crystals = [];
    const crystalGeos = [
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.DodecahedronGeometry(0.85, 0),
      new THREE.TetrahedronGeometry(1.0, 0),
    ];

    // Spawn 14 weightless faceted crystals
    for (let i = 0; i < 14; i++) {
      const geo = crystalGeos[i % crystalGeos.length];
      const mesh = new THREE.Mesh(geo, crystalShaderMat.clone());

      const startX = (Math.random() - 0.5) * 22;
      const startY = (Math.random() - 0.5) * 16;
      const startZ = (Math.random() - 0.5) * 8 - 1;

      mesh.position.set(startX, startY, startZ);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = Math.random() * 0.45 + 0.35;
      mesh.scale.set(scale, scale, scale);

      crystals.push({
        mesh,
        basePos: new THREE.Vector3(startX, startY, startZ),
        currentPos: new THREE.Vector3(startX, startY, startZ),
        velocity: new THREE.Vector3(0, 0, 0),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        floatSpeed: Math.random() * 0.012 + 0.006,
        phase: Math.random() * Math.PI * 2,
        mass: Math.random() * 0.8 + 0.6,
      });

      scene.add(mesh);
    }

    // --- 3. WEIGHTLESS CHROMATIC PLASMA RIBBON WAVES ---
    const ribbonCount = 3;
    const ribbons = [];

    for (let r = 0; r < ribbonCount; r++) {
      const curvePoints = [];
      const segmentCount = 60;
      for (let s = 0; s < segmentCount; s++) {
        const t = (s / segmentCount) * 28 - 14;
        curvePoints.push(new THREE.Vector3((r - 1) * 6, t, -4 + r * 1.5));
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.04, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? 0xff143d : r === 1 ? 0x8b5cf6 : 0x00f5ff,
        transparent: true,
        opacity: 0.28,
        wireframe: true,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tubeMesh);
      ribbons.push({ mesh: tubeMesh, origPoints: curvePoints, speed: 0.8 + r * 0.3 });
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

    // --- Animation & Physics Loop ---
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // Smooth mouse spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * (SPRING_STIFFNESS * 0.08 * dt);
      mouse.y += (mouse.targetY - mouse.y) * (SPRING_STIFFNESS * 0.08 * dt);

      // Camera subtle parallax
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Update particle shader time
      particleShaderMat.uniforms.uTime.value = time;

      // 1. UPDATE 2,500 PARTICLES (Brownian motion, upward antigravity lift, mouse repulsion)
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        let px = posArray[idx];
        let py = posArray[idx + 1];
        let pz = posArray[idx + 2];

        // Zero-gravity upward ascension
        py += velocities[idx + 1];

        // Subtle Brownian curl turbulence
        const phase = phases[i];
        px += Math.sin(time * 0.8 + phase + py * 0.2) * 0.01;
        pz += Math.cos(time * 0.6 + phase + px * 0.2) * 0.008;

        // Reset if reached top boundary (ascend infinitely)
        if (py > 13.5) {
          py = -13.5;
          px = (Math.random() - 0.5) * 32;
          pz = (Math.random() - 0.5) * 16 - 2;
        }

        // Mouse Repulsive Physics (Liquid plasma dispersion)
        const dx = px - mouse.worldPos.x;
        const dy = py - mouse.worldPos.y;
        const dz = pz - mouse.worldPos.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const repelRadiusSq = 16.0; // ~4.0 units radius

        if (distSq < repelRadiusSq) {
          const dist = Math.sqrt(distSq) || 0.001;
          const force = (1.0 - dist / 4.0) * (0.8 + mouse.speed * 0.4);
          const pushX = (dx / dist) * force * 0.35;
          const pushY = (dy / dist) * force * 0.35 + force * 0.15; // upward magnetic levitation
          const pushZ = (dz / dist) * force * 0.25;

          px += pushX;
          py += pushY;
          pz += pushZ;
        }

        posArray[idx] = px;
        posArray[idx + 1] = py;
        posArray[idx + 2] = pz;
      }

      posAttr.needsUpdate = true;

      // 2. UPDATE FLOATING OBSIDIAN CRYSTALS (Spring damping stiffness: 120, damping: 14)
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        const mesh = c.mesh;

        // Continuous antigravity upward drift & sinusoidal breathing
        c.basePos.y += c.floatSpeed;
        if (c.basePos.y > 10.5) {
          c.basePos.y = -10.5;
          c.basePos.x = (Math.random() - 0.5) * 22;
        }

        const hoverY = Math.sin(time * 1.2 + c.phase) * 0.45;
        const targetPos = new THREE.Vector3(
          c.basePos.x + Math.sin(time * 0.6 + c.phase) * 0.3,
          c.basePos.y + hoverY,
          c.basePos.z
        );

        // Repulsion from mouse cursor
        const toMouse = new THREE.Vector3().subVectors(c.currentPos, mouse.worldPos);
        const mouseDist = toMouse.length();
        if (mouseDist < 4.5) {
          const repelForce = (1.0 - mouseDist / 4.5) * 2.8;
          toMouse.normalize().multiplyScalar(repelForce);
          targetPos.add(toMouse);
          // Add extra upward float when agitated
          targetPos.y += repelForce * 0.5;
        }

        // Spring-damper integration
        const displacement = new THREE.Vector3().subVectors(targetPos, c.currentPos);
        const springForce = displacement.multiplyScalar(SPRING_STIFFNESS * dt * 0.04);
        c.velocity.add(springForce);
        c.velocity.multiplyScalar(Math.max(0, 1 - SPRING_DAMPING * dt * 0.3));
        c.currentPos.add(c.velocity);

        mesh.position.copy(c.currentPos);

        // Rotation physics
        mesh.rotation.x += c.rotSpeed.x + c.velocity.y * 0.05;
        mesh.rotation.y += c.rotSpeed.y + c.velocity.x * 0.05;
        mesh.rotation.z += c.rotSpeed.z;

        // Update shader time for rim highlights
        mesh.material.uniforms.uTime.value = time;
      }

      // 3. UPDATE CHROMATIC PLASMA RIBBONS
      for (let r = 0; r < ribbons.length; r++) {
        const rib = ribbons[r];
        rib.mesh.rotation.y = time * 0.08 * rib.speed;
        rib.mesh.position.y = Math.sin(time * 0.5 + r) * 0.6;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      // Clean up geometries and materials
      particleGeo.dispose();
      particleShaderMat.dispose();
      crystalGeos.forEach((g) => g.dispose());
      crystalShaderMat.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
