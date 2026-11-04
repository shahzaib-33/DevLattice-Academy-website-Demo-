"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero centrepiece: a crystalline lattice of glowing nodes and edges
 * that slowly rotates and leans toward the cursor. Rendering pauses when
 * the canvas leaves the viewport or the tab is hidden, and the node count
 * drops on small screens. Reduced motion renders a single still frame.
 */
export default function LatticeScene({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    const group = new THREE.Group();
    scene.add(group);

    // Lattice nodes inside a sphere
    const N = small ? 3 : 4;
    const spacing = 1.18;
    const R = N * spacing + 0.2;
    const pts: THREE.Vector3[] = [];
    for (let x = -N; x <= N; x++)
      for (let y = -N; y <= N; y++)
        for (let z = -N; z <= N; z++) {
          const v = new THREE.Vector3(x, y, z).multiplyScalar(spacing);
          // offset alternate layers for a crystalline (FCC-like) feel
          if ((x + y + z) % 2 !== 0) continue;
          if (v.length() <= R) pts.push(v);
        }

    const violet = new THREE.Color("#a78bfa");
    const blue = new THREE.Color("#4f7cff");
    const cyan = new THREE.Color("#38d6ff");

    const pos = new Float32Array(pts.length * 3);
    const col = new Float32Array(pts.length * 3);
    const size = new Float32Array(pts.length);
    pts.forEach((p, i) => {
      pos.set([p.x, p.y, p.z], i * 3);
      const t = (p.y / R + 1) / 2;
      const c = violet.clone().lerp(t > 0.5 ? cyan : blue, Math.abs(t - 0.5) * 2);
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.6 + Math.random() * 0.8 + (p.length() < 1.5 ? 1.2 : 0);
    });

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    pGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixel: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float aSize; varying vec3 vColor; uniform float uTime; uniform float uPixel;
        void main(){
          vColor = color;
          vec3 p = position;
          float pulse = 0.85 + 0.25 * sin(uTime * 1.6 + position.x * 1.7 + position.y * 1.3);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * pulse * 26.0 * uPixel / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          float core = smoothstep(0.18, 0.0, d);
          gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.8), a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    group.add(new THREE.Points(pGeo, pMat));

    // Edges between nearest neighbours
    const ePos: number[] = [];
    const eCol: number[] = [];
    const maxD = spacing * Math.SQRT2 + 0.01;
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) <= maxD) {
          ePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          eCol.push(col[i * 3], col[i * 3 + 1], col[i * 3 + 2], col[j * 3], col[j * 3 + 1], col[j * 3 + 2]);
        }
      }
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.Float32BufferAttribute(ePos, 3));
    eGeo.setAttribute("color", new THREE.Float32BufferAttribute(eCol, 3));
    const eMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false });
    group.add(new THREE.LineSegments(eGeo, eMat));

    // Outer wireframe shell
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(R + 0.9, 1)),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.12 }),
    );
    group.add(shell);

    // Ambient dust
    const dustCount = small ? 140 : 320;
    const dPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 7 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      dPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.6, r * Math.cos(ph) - 4], i * 3);
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false }));
    scene.add(dust);

    group.rotation.set(0.55, 0.65, 0);

    // Sizing
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 14 : 11;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer influence
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / innerWidth - 0.5) * 2;
      target.y = (e.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(el);

    const t0 = performance.now();
    let raf = 0;
    let running = false;
    const frame = () => {
      const t = (performance.now() - t0) / 1000;
      pMat.uniforms.uTime.value = t;
      group.rotation.y += 0.0022;
      group.rotation.x += (0.55 + target.y * 0.25 - group.rotation.x) * 0.04;
      group.rotation.z += (target.x * -0.12 - group.rotation.z) * 0.04;
      shell.rotation.y -= 0.0012;
      dust.rotation.y = t * 0.015;
      renderer.render(scene, camera);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
      else running = false;
    };
    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);

    if (reduce) renderer.render(scene, camera);
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      [pGeo, eGeo, dGeo, shell.geometry].forEach((g) => g.dispose());
      [pMat, eMat, shell.material as THREE.Material, dust.material as THREE.Material].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className={className} />;
}
