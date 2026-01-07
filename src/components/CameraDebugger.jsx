import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function CameraDebugger() {
  const { camera } = useThree();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key.toLowerCase() !== "c") return; // press "c" to log
      console.log("camera.position", camera.position.toArray());
      console.log("camera.rotation (Euler)", [camera.rotation.x, camera.rotation.y, camera.rotation.z]);
      console.log("camera.quaternion", camera.quaternion.toArray());
      console.log("camera.zoom", camera.zoom);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [camera]);

  return null;
}
