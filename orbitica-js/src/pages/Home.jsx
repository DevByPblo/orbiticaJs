// Home.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from '../components/SolarSystem';

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', background:'none'}}>
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }} style={{ display: 'block', background:'black' }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <SolarSystem onSelectPlanet={setSelectedPlanet} />
        <OrbitControls enablePan enableZoom enableRotate />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {selectedPlanet && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,         
            width: 300,
            backgroundColor:  '#000' ,
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 1000,       
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setSelectedPlanet(null)}
        >
            <h2>{selectedPlanet.name}</h2>
             <p><strong>Type:</strong> {selectedPlanet.type}</p>
                <p><strong>Diameter:</strong> {selectedPlanet.diameter}</p>
                <p><strong>Distance from Sun:</strong> {selectedPlanet.distanceFromSun}</p>
                <p><strong>Orbital Distance (scaled):</strong> {selectedPlanet.distance}</p>
                <p><strong>Temperature:</strong> {selectedPlanet.temperature}</p>
                <p><strong>Day Length:</strong> {selectedPlanet.dayLength}</p>
                <p><strong>Atmosphere:</strong> {selectedPlanet.atmosphere.join(', ')}</p>
                <p><strong>Category:</strong> {selectedPlanet.category}</p>
                <p style={{ marginTop: '0.5rem' }}>{selectedPlanet.description}</p>
                <small>Click anywhere here to close</small>
        </div>
      )}

       
    </div>
  );
};

export default Home;
