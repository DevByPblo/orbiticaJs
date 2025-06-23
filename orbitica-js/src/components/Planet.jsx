import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Planet = ({ planet, onClick }) => {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!planetRef.current) return;
    const t = clock.getElapsedTime() * planet.speed;
    const x = Math.sin(t) * planet.distance;
    const z = Math.cos(t) * planet.distance;
    planetRef.current.position.set(x, 0, z);
  });

  return (
    <mesh
      ref={planetRef}
      onClick={e => {
        e.stopPropagation();
        onClick(planet);
      }}
      onPointerOver={e => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <sphereGeometry args={[planet.size, 32, 32]} />
      <meshStandardMaterial color={planet.color} />

      {hovered && (
        <Html position={[0, planet.size + 0.2, 0]}>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            padding: '8px 12px',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            maxWidth: '200px',
            whiteSpace: 'normal',
            pointerEvents: 'none'
          }}>
            <strong>{planet.name}</strong>
          
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Planet;
