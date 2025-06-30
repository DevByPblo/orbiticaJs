import React,{useEffect} from 'react';
import { Stars, useTexture } from '@react-three/drei';
import Planet from './Planet';
import OrbitLine from './OrbitLine';
import { planetsData } from '../data/planetsData';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const SolarSystem = ({ onSelectPlanet, speedScale = 1, currentSystem = 'system1' , updatedPosition }) => {
  const planets = planetsData[currentSystem] || [];

  const [sunTexture, bmap] = useLoader(THREE.TextureLoader, [
    '/sun.jpg',
    '/planetBump/sun_displacement.png',
  ]);
 
const handleUpdatedPlanetPosition = (id,pos)=>{
    updatedPosition?.(id,pos)
 

}
 
  
  return (
    <>
      {/* Starfield */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Lights */}
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="white" />

      {/* Sun */}
      <mesh receiveShadow={false}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={new THREE.Color('#ffffff')}
          emissiveMap={sunTexture}
          emissiveIntensity={0.4}
          bumpMap={bmap}
          bumpScale={0.4}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={200}
        distance={100}
        decay={2}
        color="white"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />

     
      {/* Planets  */}
      {planets.map((planet) => {
        const orbitAngleRad = THREE.MathUtils.degToRad(planet.planetOrbitAngle || 0);
        
        return (
          <group key={planet.id} rotation={[orbitAngleRad, 0, 0]}>
            <Planet
              planet={planet}
              onClick={onSelectPlanet}
              speedScale={speedScale}
              updatedPosition={handleUpdatedPlanetPosition}
            />
            <OrbitLine key={`orbit-${planet.id}`} radius={planet.distance  } />
          </group>
        );
      })}
    </>
  );
};

export default SolarSystem;
