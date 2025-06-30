import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ planet, onClick, speedScale = 1, updatedPosition }) => {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const texture = useTexture(planet.image);

  const ringTexture = planet.rings ? useTexture(planet.rings.texture) : null;
  const tilt = THREE.MathUtils.degToRad(planet.planetTilt || 0);
  
  useFrame(({ clock }) => {
    if (!planetRef.current) return;

    const t = clock.getElapsedTime() * planet.speed * speedScale;
    const x = Math.sin(t) * planet.distance;
    const z = Math.cos(t) * planet.distance;

    planetRef.current.position.set(x, 0, z);
    planetRef.current.rotation.y += 0.01 * speedScale;
    planetRef.current.rotation.z = tilt;
 
    updatedPosition?.(planet.id, planetRef.current.position.clone());
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    onClick?.(planet);
  };

  return (
    <group ref={planetRef}>
      {/* Planet Sphere with Enhanced Styling */}
      <mesh
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        castShadow
        receiveShadow
        scale={hovered ? 1.1 : clicked ? 0.95 : 1}
      >
        <sphereGeometry args={[planet.size, 128, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={hovered ? new THREE.Color(0x444444) : new THREE.Color(0x000000)}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Atmospheric Glow Effect */}
      {hovered && (
        <mesh scale={1.3}>
          <sphereGeometry args={[planet.size, 32, 16]} />
          <meshBasicMaterial
            color={planet.glowColor || '#ffffff'}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Planet Rings with Enhanced Styling */}
      {planet.rings && ringTexture && (
        <mesh 
          rotation={[Math.PI / 2, 0, 0]}
          scale={hovered ? 1.05 : 1}
        >
          <ringGeometry
            args={[
              planet.rings.innerRadius,
              planet.rings.outerRadius,
              64,
            ]}
          />
          <meshStandardMaterial
            map={ringTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={hovered ? 0.8 : 0.6}
          />
        </mesh>
      )}

      {/* Enhanced Tooltip */}
      {hovered && (
        <Html position={[0, planet.size + 0.5, 0]} center>
          <div className="planet-tooltip">
            <div className="tooltip-header">
              <h3 className="planet-name">{planet.name}</h3>
            </div>
            <div className="tooltip-content">
              {planet.type && <p className="planet-type">{planet.type}</p>}
              {planet.distance && (
                <p className="planet-stat">
                  <span className="stat-label">Distance:</span>
                  <span className="stat-value">{planet.distance.toFixed(1)} AU</span>
                </p>
              )}
              {planet.size && (
                <p className="planet-stat">
                  <span className="stat-label">Size:</span>
                  <span className="stat-value">{planet.size.toFixed(2)}x</span>
                </p>
              )}
              <p className="click-hint">Click to explore</p>
            </div>
          </div>
          
          <style jsx>{`
            .planet-tooltip {
              background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 12px;
              padding: 16px;
              min-width: 200px;
              max-width: 280px;
              color: white;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset;
              transform: translateY(-10px);
              pointer-events: none;
              animation: tooltipFadeIn 0.3s ease-out;
            }
            
            @keyframes tooltipFadeIn {
              from {
                opacity: 0;
                transform: translateY(-5px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(-10px) scale(1);
              }
            }
            
            .tooltip-header {
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            
            .planet-name {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }
            
            .tooltip-content {
              display: flex;
              flex-direction: column;
              gap: 6px;
            }
            
            .planet-type {
              margin: 0;
              font-size: 12px;
              color: #a0a0ff;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .planet-stat {
              margin: 0;
              font-size: 13px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .stat-label {
              color: #cccccc;
              font-weight: 400;
            }
            
            .stat-value {
              color: #ffffff;
              font-weight: 600;
              font-family: 'JetBrains Mono', monospace;
            }
            
            .click-hint {
              margin: 8px 0 0 0;
              font-size: 11px;
              color: #888888;
              text-align: center;
              font-style: italic;
              padding-top: 8px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .planet-tooltip::before {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 12px;
              height: 12px;
              background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-top: none;
              border-left: none;
              transform: translateX(-50%) rotate(45deg);
            }
          `}</style>
        </Html>
      )}

      {/* Selection Ring */}
      {clicked && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.size * 1.2, planet.size * 1.3, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;
