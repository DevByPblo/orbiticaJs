import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

const CameraLookAt = ({ target = [0, 0, 0] }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(...target));
  }, [target, camera]);

  return null;
};

export default CameraLookAt;