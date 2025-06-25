import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ planet, onClick, speedScale = 1 }) => {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  // const texture = useTexture(planet.image || 'jupiter_texture.jpg');
  const texture = useTexture(planet.image)

  const tilt= THREE.MathUtils.degToRad(planet.planetTilt)
  // const ortbitAngle = THREE.MathUtils.degToRad(planet.planetOrbitAngle)

  useFrame(({ clock }) => {
    if (!planetRef.current) return;

    const t = clock.getElapsedTime() * planet.speed * speedScale    ;
    const x = Math.sin(t) * planet.distance ;
    const z = Math.cos(t) * planet.distance ;

    planetRef.current.position.set(x, 0, z);
    planetRef.current.rotation.y += 0.01 * speedScale; 


    // planetRef.current.rotation.x = ortbitAngle;
    planetRef.current.rotation.z =  tilt;
  });

  return (
    <mesh
      ref={planetRef}
      onClick={(e) => {
        e.stopPropagation();
        // onClick(planet);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[planet.size, 378, 32]} />
      
        {texture ? (
        <meshStandardMaterial map={texture || planet.color } />
      ) : (
        <meshStandardMaterial color={planet.color} />
      )}
       

      {hovered && (
        <Html position={[0, planet.size + 0.2, 0]}>
          <div
            style={{
              background: 'rgba(0,0,0,0.7)',
              padding: '8px 12px',
              borderRadius: '6px',
              color: 'white',
              fontSize: '14px',
              maxWidth: '200px',
              whiteSpace: 'normal',
              pointerEvents: 'none',
            }}
          >
            <strong>{planet.name}</strong>
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Planet;
