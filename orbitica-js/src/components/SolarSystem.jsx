import React from 'react';
import { Stars } from '@react-three/drei';
import Planet from './Planet';
import OrbitLine from './OrbitLine';
import { planetsData } from '../data/planetsData';

const SolarSystem = ({ onSelectPlanet, speedScale = 1, currentSystem = 'system1' }) => {
 
  const planets = planetsData[currentSystem] || [];

  return (
    <>
      {/* Starfield */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="white" />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

      {/* Orbit lines */}
      {planets.map((p) => (
        <OrbitLine key={`orbit-${p.id}`} radius={p.distance} />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={onSelectPlanet}
          speedScale={speedScale}
        />
      ))}
    </>
  );
};

export default SolarSystem;
