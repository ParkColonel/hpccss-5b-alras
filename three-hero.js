import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const canvas = document.getElementById('hero-three-canvas');
const wrapper = document.querySelector('.hero-three-wrap');

if (canvas && wrapper) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070d, 0.055);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5.6);

  const group = new THREE.Group();
  scene.add(group);

  const knotGeometry = new THREE.TorusKnotGeometry(1.15, 0.33, 280, 32);
  const knotMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x95d3ff,
    emissive: 0x2c5578,
    emissiveIntensity: 0.62,
    roughness: 0.26,
    metalness: 0.7,
    transmission: 0.12,
    ior: 1.3,
    clearcoat: 0.65,
    clearcoatRoughness: 0.2
  });

  const knot = new THREE.Mesh(knotGeometry, knotMaterial);
  group.add(knot);

  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.95, 1)),
    new THREE.LineBasicMaterial({
      color: 0x8fd7ff,
      transparent: true,
      opacity: 0.28
    })
  );
  group.add(wire);

  const particleCount = 1300;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    const radius = 2.6 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i3 + 1] = radius * Math.cos(phi);
    particlePositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      color: 0xc3ecff,
      size: 0.038,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  scene.add(particles);

  const keyLight = new THREE.DirectionalLight(0xd0eeff, 1.2);
  keyLight.position.set(2.2, 2.6, 4.8);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x7d8dff, 0.8);
  fillLight.position.set(-3.4, -1.5, -2.2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x55d0ff, 2.5, 12, 1.2);
  rimLight.position.set(0, -0.3, 2.8);
  scene.add(rimLight);

  let rafId = 0;
  let running = false;
  let hasSignaledReady = false;

  function resize() {
    const rect = wrapper.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 1);
    const height = Math.max(Math.floor(rect.height), 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function isVisible() {
    return !document.hidden && window.getComputedStyle(wrapper).display !== 'none';
  }

  function render(tMs) {
    const t = tMs * 0.001;
    const motionScale = prefersReducedMotion.matches ? 0.15 : 1;

    knot.rotation.x = t * 0.44 * motionScale;
    knot.rotation.y = t * 0.65 * motionScale;
    wire.rotation.x = -t * 0.2 * motionScale;
    wire.rotation.z = t * 0.12 * motionScale;

    const pulse = 1 + Math.sin(t * 1.3) * 0.09 * motionScale;
    knot.scale.setScalar(pulse);

    particles.rotation.y = t * 0.045 * motionScale;
    particles.rotation.x = t * 0.023 * motionScale;

    camera.position.x = Math.sin(t * 0.32) * 0.35 * motionScale;
    camera.position.y = Math.cos(t * 0.26) * 0.2 * motionScale;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!hasSignaledReady) {
      hasSignaledReady = true;
      window.dispatchEvent(new CustomEvent('hero3d:ready'));
    }

    if (running) {
      rafId = window.requestAnimationFrame(render);
    }
  }

  function start() {
    if (running) return;
    running = true;
    rafId = window.requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  const observer = new ResizeObserver(resize);
  observer.observe(wrapper);

  document.addEventListener('visibilitychange', () => {
    if (isVisible()) {
      start();
    } else {
      stop();
    }
  });

  const hero = document.querySelector('.hero');
  if (hero) {
    const heroObserver = new MutationObserver(() => {
      if (isVisible()) {
        start();
      } else {
        stop();
      }
    });
    heroObserver.observe(hero, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  resize();
  if (isVisible()) {
    start();
  }
}
