// BouncyDupesR3F.jsx
// npm i three @react-three/fiber @react-three/drei @react-three/rapier

import React, { Suspense, useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useEnvironment } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  ConeCollider,
  ConvexHullCollider,
} from "@react-three/rapier";
import CameraDebugger from "./CameraDebugger";

const HDR_URL = "/asset/university_workshop_2k.hdr";

const SHAPES = [
  { key: "sphere", label: "Sphere" },
  { key: "cube", label: "Cube" },
  { key: "ico", label: "Icosahedron" },

  // ✅ added
  { key: "cone", label: "Cone" },
  { key: "cylinder", label: "Cylinder" },
  { key: "torus", label: "Torus" },
  { key: "tetra", label: "Tetrahedron" },
  { key: "octa", label: "Octahedron" },
  { key: "dodeca", label: "Dodecahedron" },
];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}
function randomUnit2D() {
  const a = Math.random() * Math.PI * 2;
  return new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
}
function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function CameraRefBinder({ cameraRef }) {
  const { camera } = useThree();
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera, cameraRef]);
  return null;
}

function FixedCameraStartOnce({ controlsRef, cameraPoseRef }) {
  const { camera } = useThree();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    camera.position.set(-7.01202024676331, 2.204878946110199, 1.5637048582775581);
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    const ctrls = controlsRef.current;
    if (ctrls) {
      ctrls.target.set(0, 0.75, 0);
      ctrls.update();

      cameraPoseRef.current.position.copy(camera.position);
      cameraPoseRef.current.zoom = camera.zoom;
      cameraPoseRef.current.target.copy(ctrls.target);
    }
  }, [camera, controlsRef, cameraPoseRef]);

  return null;
}

function ControlsPoseTracker({ controlsRef, cameraRef, cameraPoseRef, snapshotPose }) {
  const lastLogAt = useRef(0);

  useEffect(() => {
    const ctrls = controlsRef.current;
    if (!ctrls) return;

    const onStart = () => snapshotPose("ORBIT start");
    const onEnd = () => snapshotPose("ORBIT end");
    const onChange = () => {
      const cam = cameraRef.current;
      if (!cam) return;

      cameraPoseRef.current.position.copy(cam.position);
      cameraPoseRef.current.zoom = cam.zoom;
      cameraPoseRef.current.target.copy(ctrls.target);

      const now = performance.now();
      if (now - lastLogAt.current > 200) {
        lastLogAt.current = now;
        snapshotPose("ORBIT change (throttled)");
      }
    };

    ctrls.addEventListener("start", onStart);
    ctrls.addEventListener("change", onChange);
    ctrls.addEventListener("end", onEnd);

    return () => {
      ctrls.removeEventListener("start", onStart);
      ctrls.removeEventListener("change", onChange);
      ctrls.removeEventListener("end", onEnd);
    };
  }, [controlsRef, cameraRef, cameraPoseRef, snapshotPose]);

  return null;
}

function HdrIfAvailable({ url }) {
  const { scene } = useThree();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(url);
        const ct = r.headers.get("content-type") || "";
        const valid = r.ok && !ct.includes("text/html");
        if (!alive) return;
        setOk(valid);
        if (!valid) console.warn("[BouncyDupesR3F] HDR not available or invalid. Using standard lights.");
      } catch {
        if (!alive) return;
        setOk(false);
        console.warn("[BouncyDupesR3F] HDR fetch failed. Using standard lights.");
      }
    })();
    return () => {
      alive = false;
    };
  }, [url]);

  return ok ? <ApplyEnv url={url} scene={scene} /> : null;
}

function ApplyEnv({ url, scene }) {
  const env = useEnvironment({ files: url });
  useEffect(() => {
    if (!env) return;
    const prev = scene.environment;
    scene.environment = env;
    return () => {
      scene.environment = prev;
    };
  }, [env, scene]);
  return null;
}

function BoundsWalls({ bounds, thickness = 0.3 }) {
  const h = 2.5;
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[bounds, thickness, bounds]} position={[0, 0, 0]} restitution={1.0} friction={0} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[bounds, thickness, bounds]} position={[0, h * 2, 0]} restitution={1.0} friction={0} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[thickness, h, bounds]} position={[bounds, h, 0]} restitution={1.0} friction={0} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[thickness, h, bounds]} position={[-bounds, h, 0]} restitution={1.0} friction={0} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[bounds, h, thickness]} position={[0, h, bounds]} restitution={1.0} friction={0} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[bounds, h, thickness]} position={[0, h, -bounds]} restitution={1.0} friction={0} />
      </RigidBody>
    </>
  );
}

/**
 * Geometry factory so we can reuse vertices for convex hull colliders
 * (only for convex-ish shapes; torus is not convex).
 */
function buildGeometry(shapeKey) {
  switch (shapeKey) {
    case "cube":
      return new THREE.BoxGeometry(1.2, 1.2, 1.2);
    case "ico":
      return new THREE.IcosahedronGeometry(0.85, 0);
    case "cone":
      return new THREE.ConeGeometry(0.75, 1.5, 24);
    case "cylinder":
      return new THREE.CylinderGeometry(0.7, 0.7, 1.5, 24);
    case "torus":
      return new THREE.TorusGeometry(0.75, 0.25, 16, 48);
    case "tetra":
      return new THREE.TetrahedronGeometry(0.9, 0);
    case "octa":
      return new THREE.OctahedronGeometry(0.9, 0);
    case "dodeca":
      return new THREE.DodecahedronGeometry(0.9, 0);
    case "sphere":
    default:
      return new THREE.SphereGeometry(0.85, 32, 32);
  }
}

function geometryToHullPoints(geometry) {
  // ConvexHullCollider expects an array of point arrays: [[x,y,z], [x,y,z], ...]
  const pos = geometry.attributes.position;
  const pts = [];
  for (let i = 0; i < pos.count; i++) {
    pts.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
  }
  return pts;
}

function ShapeCollider({ shapeKey, scale }) {
  // scale affects collider sizes; our geometries are ~1-ish units already
  const s = scale;

  // For simple primitives: fast + accurate
  if (shapeKey === "sphere") return <BallCollider args={[0.6 * s]} restitution={1.0} friction={0} />;
  if (shapeKey === "cube") return <CuboidCollider args={[0.6 * s, 0.6 * s, 0.6 * s]} restitution={1.0} friction={0} />;
  if (shapeKey === "cylinder") return <CylinderCollider args={[0.75 * s, 0.7 * s]} restitution={1.0} friction={0} />;
  if (shapeKey === "cone") return <ConeCollider args={[0.75 * s, 0.75 * s]} restitution={1.0} friction={0} />;
   if (shapeKey === "ico" || shapeKey === "tetra" || shapeKey === "octa" || shapeKey === "dodeca") {
    return <BallCollider args={[0.7 * s]} restitution={1.0} friction={0} />;
  }
  // Torus is non-convex; hull becomes "filled". Keep sphere collider (best compromise)
  if (shapeKey === "torus") return <BallCollider args={[0.7 * s]} restitution={1.0} friction={0} />;

  // Polyhedra: convex hull collider fits well
  const geom = useMemo(() => buildGeometry(shapeKey), [shapeKey]);
  const points = useMemo(() => geometryToHullPoints(geom), [geom]);

  //return <ConvexHullCollider args={[points]} restitution={1.0} friction={0} />;
  return <BallCollider args={[0.65 * s]} restitution={1.0} friction={0} />;
}

function MeshForShape({ shapeKey, color, roughness, metalness, onPointerDown, onPointerUp }) {
  // Use one consistent material type so sliders are predictable
  const geom = useMemo(() => buildGeometry(shapeKey), [shapeKey]);

  return (
    <mesh
      geometry={geom}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function BouncyItem({ item, onDuplicate, material, controlsEnabledRef }) {
  const bodyRef = useRef(null);
  const lastClickAt = useRef(0);

  useEffect(() => {
    const rb = bodyRef.current;
    if (!rb) return;
    rb.setLinvel({ x: item.vel[0], y: 0, z: item.vel[2] }, true);
    rb.setEnabledTranslations(true, false, true, true);
    rb.setEnabledRotations(false, false, false, true);
  }, [item.vel]);

  return (
    <RigidBody ref={bodyRef} type="dynamic" colliders={false} position={item.pos} canSleep={false}>
      <ShapeCollider shapeKey={item.shapeKey} scale={item.scale} />

      <group scale={[item.scale, item.scale, item.scale]}>
        <MeshForShape
          shapeKey={item.shapeKey}
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
          onPointerDown={(e) => {
            e.stopPropagation();

            const now = performance.now();
            if (now - lastClickAt.current < 120) return;
            lastClickAt.current = now;

            // trigger duplication
            onDuplicate(item.id);
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
          }}
        />
      </group>
    </RigidBody>
  );
}

export default function BouncyDupesR3F({
  className = "",
  heightClass = "h-[520px]",
  bounds = 5,
  speed = 1.2,
  maxObjects = 80,
}) {
  const [selectedKey, setSelectedKey] = useState(SHAPES[0].key);
  const [useHdr, setUseHdr] = useState(true);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [showControlsUI, setShowControlsUI] = useState(false);

  // ✅ material controls
  const [materialColor, setMaterialColor] = useState("#4fd1c5");
  const [roughness, setRoughness] = useState(0.35);
  const [metalness, setMetalness] = useState(0.15);

  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsEnabledRef = useRef(false);

  useEffect(() => {
    controlsEnabledRef.current = controlsEnabled;
  }, [controlsEnabled]);

  const cameraPoseRef = useRef({
    position: new THREE.Vector3(),
    zoom: 1,
    target: new THREE.Vector3(),
  });

  const lastDupAtRef = useRef(0);

  const [items, setItems] = useState(() => [
    {
      id: makeId(),
      shapeKey: SHAPES[0].key,
      scale: 1,
      pos: [randomInRange(-bounds * 0.6, bounds * 0.6), 0.75, randomInRange(-bounds * 0.6, bounds * 0.6)],
      vel: randomUnit2D().multiplyScalar(speed).toArray(),
    },
  ]);

  // --- DEBUG ---
  const DEBUG_CAM = true;
  const fmt3 = (n) => Number(n.toFixed(3));
  const fmtV3 = (v) => [fmt3(v.x), fmt3(v.y), fmt3(v.z)];
  const snapshotPose = useCallback(
    (tag) => {
      if (!DEBUG_CAM) return;
      const cam = cameraRef.current;
      const ctrls = controlsRef.current;
      if (!cam || !ctrls) return;
      console.log(`[CamDBG] ${tag}`, {
        enabledProp: controlsEnabled,
        ctrlsEnabled: ctrls.enabled,
        pos: fmtV3(cam.position),
        zoom: fmt3(cam.zoom),
        target: fmtV3(ctrls.target),
      });
    },
    [controlsEnabled]
  );

  const applyShapeToAll = useCallback((nextKey) => {
    setSelectedKey(nextKey);
    setItems((prev) => prev.map((it) => ({ ...it, shapeKey: nextKey })));
  }, []);

  const onDuplicate = useCallback(
    (id) => {
      const now = performance.now();
      if (now - lastDupAtRef.current < 120) return;
      lastDupAtRef.current = now;

      setItems((prev) => {
        const idx = prev.findIndex((x) => x.id === id);
        if (idx === -1) return prev;

        const clicked = prev[idx];
        if (clicked.scale <= 0.2) return prev;

        const nextScale = Number(clamp(clicked.scale - 0.2, 0.2, 1).toFixed(2));

        const updated = [...prev];
        updated[idx] = { ...clicked, scale: nextScale };

        if (updated.length >= maxObjects) return updated;

        const [x, y, z] = clicked.pos;
        const jitter = 0.6;
        const nx = clamp(x + randomInRange(-jitter, jitter), -bounds * 0.7, bounds * 0.7);
        const nz = clamp(z + randomInRange(-jitter, jitter), -bounds * 0.7, bounds * 0.7);

        updated.push({
          id: makeId(),
          shapeKey: clicked.shapeKey,
          scale: nextScale,
          pos: [nx, y, nz],
          vel: randomUnit2D().multiplyScalar(speed).toArray(),
        });

        return updated;
      });
    },
    [bounds, speed, maxObjects]
  );

  // ✅ KEY: prevent orbit from starting when clicking a mesh
  const disableControlsForThisPointerDown = useCallback(
    (e) => {
      const ctrls = controlsRef.current;
      if (!ctrls) return;

      const hit = e?.intersections?.length > 0;
      if (!hit) return;

      const prev = ctrls.enabled;
      ctrls.enabled = false;

      queueMicrotask(() => {
        ctrls.enabled = prev && controlsEnabledRef.current;
      });
    },
    []
  );

  const material = useMemo(
    () => ({ color: materialColor, roughness, metalness }),
    [materialColor, roughness, metalness]
  );

  return (
    <div className={`relative w-full ${heightClass} ${className}`}>
      {/* Show/hide panel */}
      <div className="absolute left-3 top-3 z-20 rounded-xl bg-black/60 px-3 py-2 text-white shadow-lg backdrop-blur">
        <label className="flex cursor-pointer items-center gap-2 text-[11px] text-white/90">
          <input
            id="showControlsUI"
            type="checkbox"
            className="h-4 w-4 accent-white"
            checked={showControlsUI}
            onChange={(e) => setShowControlsUI(e.target.checked)}
          />
          <span>{showControlsUI ? "Hide Controls" : "Show Controls"}</span>
        </label>
      </div>

      {/* Controls panel */}
      {showControlsUI && (
        <div className="absolute left-3 top-14 z-10 w-[280px] rounded-xl bg-black/60 p-3 text-white shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3">
            {/* Shape */}
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">Object</div>
              <select
                className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none ring-1 ring-white/20 hover:bg-white/15 focus:ring-2 focus:ring-white/40"
                value={selectedKey}
                onChange={(e) => applyShapeToAll(e.target.value)}
              >
                {SHAPES.map((s) => (
                  <option key={s.key} value={s.key} className="bg-zinc-900">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Camera controls */}
            <div className="flex items-center gap-2 text-[11px] text-white/80">
              <input
                id="controlsEnabled"
                type="checkbox"
                className="h-4 w-4 accent-white"
                checked={controlsEnabled}
                onChange={(e) => {
                  const next = e.target.checked;
                  const cam = cameraRef.current;
                  const ctrls = controlsRef.current;
                  if (!cam || !ctrls) return;

                  snapshotPose(`TOGGLE ${next ? "ON" : "OFF"} BEFORE`);

                  if (next) {
                    cam.position.copy(cameraPoseRef.current.position);
                    cam.zoom = cameraPoseRef.current.zoom ?? 1;
                    cam.updateProjectionMatrix();

                    ctrls.target.copy(cameraPoseRef.current.target);
                    ctrls.enabled = true;
                    ctrls.update();
                  } else {
                    ctrls.update();
                    cameraPoseRef.current.position.copy(cam.position);
                    cameraPoseRef.current.zoom = cam.zoom;
                    cameraPoseRef.current.target.copy(ctrls.target);

                    ctrls.enabled = false;
                  }

                  setControlsEnabled(next);
                  requestAnimationFrame(() => snapshotPose(`TOGGLE ${next ? "ON" : "OFF"} RAF after`));
                }}
              />
              <label htmlFor="controlsEnabled">Enable camera controls</label>
            </div>

            {/* Material controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Color</div>
              <input
                type="color"
                value={materialColor}
                onChange={(e) => setMaterialColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded-md bg-transparent"
                title="Pick object color"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] text-white/80">
                <span>Roughness</span>
                <span>{roughness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={roughness}
                onChange={(e) => setRoughness(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] text-white/80">
                <span>Metalness</span>
                <span>{metalness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={metalness}
                onChange={(e) => setMetalness(parseFloat(e.target.value))}
              />
            </div>

            {/* HDR */}
            <div className="flex items-center gap-2 text-[11px] text-white/80">
              <input
                id="useHdr"
                type="checkbox"
                className="h-4 w-4 accent-white"
                checked={useHdr}
                onChange={(e) => setUseHdr(e.target.checked)}
              />
              <label htmlFor="useHdr">Use HDRI</label>
            </div>

            <div className="text-xs text-white/70">
              Click duplicates + shrinks: <span className="text-white/90">1 → 0.8 → 0.6 → 0.4 → 0.2</span>.
              <br />
              Collision is now more shape-appropriate (primitives + convex hull).
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ fov: 45 }}
        className="h-full w-full rounded-2xl bg-slate-900/50"
        onPointerDownCapture={(e) => {
          snapshotPose("CANVAS pointerdown capture");
          disableControlsForThisPointerDown(e);
        }}
        onPointerUpCapture={() => snapshotPose("CANVAS pointerup capture")}
      >
        <Suspense fallback={null}>
          <CameraDebugger />
          <CameraRefBinder cameraRef={cameraRef} />
          <FixedCameraStartOnce controlsRef={controlsRef} cameraPoseRef={cameraPoseRef} />

          <ambientLight intensity={0.35} />
          <directionalLight position={[8, 12, 6]} intensity={1.0} />
          <directionalLight position={[-8, 10, -6]} intensity={0.6} />

          {useHdr ? <HdrIfAvailable url={HDR_URL} /> : null}

          <OrbitControls ref={controlsRef} enabled={controlsEnabled} makeDefault />

          <ControlsPoseTracker
            controlsRef={controlsRef}
            cameraRef={cameraRef}
            cameraPoseRef={cameraPoseRef}
            snapshotPose={snapshotPose}
          />

          <Physics gravity={[0, 0, 0]}>
            <BoundsWalls bounds={bounds} thickness={0.3} />
            {items.map((it) => (
              <BouncyItem
                key={it.id}
                item={it}
                onDuplicate={onDuplicate}
                material={material}
                controlsEnabledRef={controlsEnabledRef}
              />
            ))}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
