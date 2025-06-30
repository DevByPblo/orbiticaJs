import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from '../components/SolarSystem';
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber';
import { Play, Pause, Settings, Zap, XCircle} from 'lucide-react';
import CameraLookAt from '../components/CameraLookAt';
import SplashScreen from '../components/SplashScreen';
 

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
   const [speedScale, setSpeedScale] = useState(1)
   const [currentSystem, setCurrentSystem] = useState('system1')
   const [planetPosition,setPlanetPosition ] = useState({})
   const [isPaused,setIsPaused] =  useState(false)
   const [hudIsOn,setHudIsOn] =  useState(true)
  const [showSplash, setShowSplash] = useState(false);
  const [blur, setBlur] =useState(false);
   
  const handleUpdatePlanetPositions = (id, pos) => {
    setPlanetPosition(prev => ({ ...prev, [id]: pos }));
  };

  const toggleHub =()=>{
    setHudIsOn(prev => !prev)
  }

  const toggleBlur = () => {

    setBlur(prev => !prev);
    setIsPaused(!isPaused);
    setSpeedScale(isPaused ? 1 : 0);
  };

  const togglePause = () => {
    console.log(isPaused)
    setIsPaused(!isPaused);
    setSpeedScale(isPaused ? 1 : 0);
  };


  const handleSystemChange = (systemName) => {
  setShowSplash(true);     
  console.log('splash')   
  setTimeout(() => {
    setCurrentSystem(systemName);  
    setShowSplash(false);      
  }, 1500);  
};
 

  useEffect(() => {
     console.log(planetPosition[selectedPlanet] ?? `${selectedPlanet?.name} No data`);
  }, [selectedPlanet, planetPosition]);


 


  return (
    
    <div style={{ position: 'relative', height: '100vh', width: '100vw', background:'none', }}>
      {showSplash && <SplashScreen />}
      <Canvas shadows  camera={{ position: [0, 5, 15], fov: 50, }} style={{ display: 'block', background:'black',filter: `blur(${blur === true ? '4px' : '0'})` }} >
        <CameraLookAt target={[10,200,3]}/>

        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <SolarSystem onSelectPlanet={setSelectedPlanet} speedScale={speedScale} currentSystem={currentSystem}  updatedPosition={handleUpdatePlanetPositions}  />
        <OrbitControls enablePan enableZoom enableRotate />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

 
        
      {blur && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center gap-6 p-4">
          <button
            onClick={toggleBlur}
            aria-label="Resume"
            className="text-green-400 text-4xl focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            <Pause />
          </button>

          <span className="text-white text-3xl font-bold select-none">Paused</span>

          <Link to="/">
            <button
              className="bg-red-600 hover:bg-red-700 text-red-400 px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Exit
            </button>
          </Link>
        </div>
      )}


      {selectedPlanet && (
        <div onClick={() => setSelectedPlanet(null)} className="absolute top-6 right-6 w-80 bg-black/80 backdrop-blur-lg border border-cyan-500/30 text-white p-6 rounded-2xl z-50 cursor-pointer hover:bg-black/90 transition-all duration-300 shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-300">{selectedPlanet.name}</h2>
              
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Type:</span>
              <span className="text-cyan-200 font-medium">{selectedPlanet.type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Diameter:</span>
              <span className="text-white">{selectedPlanet.diameter}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Distance from Sun:</span>
              <span className="text-white">{selectedPlanet.distanceFromSun}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Temperature:</span>
              <span className="text-orange-300">{selectedPlanet.temperature}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Day Length:</span>
              <span className="text-white">{selectedPlanet.dayLength}</span>
            </div>
            <div className="border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300 block mb-1 ">Atmosphere:</span>
              <span className="text-blue-200 text-xs">
                {Array.isArray(selectedPlanet.atmosphere) 
                  ? selectedPlanet.atmosphere.join(', ') 
                  : selectedPlanet.atmosphere}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2 hover:scale-105 transition ease-in-out">
              <span className="text-gray-300">Category:</span>
              <span className="text-purple-300">{selectedPlanet.category}</span>
            </div>
          </div>
          
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            {selectedPlanet.description}
          </p>
          
          <div className="mt-4 text-xs text-gray-500 text-center" >
            Click anywhere to close
          </div>
        </div>
      )}
            <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-green-500/30 px-6 py-3 rounded-2xl text-white z-50 flex items-center gap-4 shadow-2xl shadow-green-500/10'>
      <Zap className="w-5 h-5 text-cyan-400"/>
    <input type="range" id="speedSlider" name="speed" min="0" max="2" step='0.00001' value={speedScale} onChange={(e)=>setSpeedScale(Number(e.target.value))}  className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"/>
    <span className='text-cyan-300 font-mono min-w-20'>Speed: X {speedScale.toFixed(1)}</span>
    <button className='text-cyan-600' onClick={ togglePause}>{isPaused? <Pause/> : <Play/>}</button>
      </div>
      

    

   {hudIsOn?(

  <div   className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-green-500/30 px-6 py-3 rounded-2xl text-white z-50 flex items-center gap-4 shadow-2xl shadow-green-500/10">
        <button onClick={toggleBlur}> <Settings className="w-5 h-5 text-green-400 cursor-pointer transition ease-in-out hover:scale-110" />
         </button>
   
        <div className="flex gap-2">
          {['system1', 'system2', 'system4'].map((system, index) => (
            <button
              key={system}
              onClick={() => handleSystemChange(system)}
              variant={currentSystem === system ? "default" : "outline"}
              size="sm"
              className={
                currentSystem === system 
                  ? "bg-green-500 hover:bg-green-600 text-green-600" 
                  : "bg-transparent border-green-500/50 text-gray-600 hover:bg-green-500/20 hover:text-green-200"
              }
            >
              System {index + 1}
            </button>
          ))}
        </div>
         <XCircle onClick={toggleHub} className="w-5 h-5 text-white-400 hover:scale-110 transition ease-in-out cursor-pointer z-50  " />
      </div >


   ):(

     <div  onClick={toggleHub} className=" cursor-pointer absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-green-500/30 px-6 py-3 rounded-2xl text-white z-50 flex items-center gap-4 shadow-2xl shadow-green-500/10 hover:scale-105 transition ease-in-out" >Change System</div>


   ) }
      
       <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;
