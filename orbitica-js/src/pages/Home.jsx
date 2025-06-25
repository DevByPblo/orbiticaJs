// Home.jsx
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from '../components/SolarSystem';

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
   const [speedScale, setSpeedScale] = useState(1)
   const [currentSystem, setCurrentSystem] = useState('system4')

    //  const incSpeed =()=>{
    //     setSpeedScale(prev => prev + 1)
    //  }
    //   const decSpeed =()=>{
    //     speedScale === 0 ? speedScale = 1 :setSpeedScale(prev => prev - 1)
    //  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', background:'none'}}>
      <Canvas shadows  camera={{ position: [0, 5, 15], fov: 50 }} style={{ display: 'block', background:'black' }} >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <SolarSystem onSelectPlanet={setSelectedPlanet} speedScale={speedScale} currentSystem={currentSystem} />
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
                <p><strong>Atmosphere:</strong> {Array.isArray(selectedPlanet.atmosphere) ? selectedPlanet.atmosphere.join(', ') : selectedPlanet.atmosphere}</p>
                <p><strong>Category:</strong> {selectedPlanet.category}</p>
                <p style={{ marginTop: '0.5rem' }}>{selectedPlanet.description}</p>
                <small>Click anywhere here to close</small>
        </div>
      )}
            <div style={{
            position: 'absolute',
            bottom: 20,        
            left: '50%',       
            transform: 'translateX(-50%)',  
            backgroundColor: 'red',
            padding: '10px 20px',
            borderRadius: '8px',
            color: 'white',
            zIndex: 1000,
            display:'flex',
            
            }}>
        {/* <button onClick={decSpeed}>-</button>
      <span>{speedScale}</span>
        <button onClick={incSpeed}>+</button> */}
    <input type="range" id="speedSlider" name="speed" min="0" max="2" step='0.00001' value={speedScale} onChange={(e)=>setSpeedScale(Number(e.target.value))} />
    <span>Speed: X {speedScale}</span>
      </div>
      
     <div>

                <button onClick={()=>setCurrentSystem('system1') }>System 1</button>
                <button onClick={()=>setCurrentSystem('system2')} >System 2</button>
                <button onClick={()=>setCurrentSystem('system3')} >System 3</button>
                 <button onClick={()=>setCurrentSystem('system4')} >System 4</button>

    </div>
    </div>
  );
};

export default Home;
