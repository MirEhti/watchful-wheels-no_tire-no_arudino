
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

interface CarAnimationProps {
  isDaytime: boolean;
  isDrowsy: boolean;
}

const CarModel = ({ isDrowsy }: { isDrowsy: boolean }) => {
  // In a full implementation, we would load a GLTF car model
  // For this demo, we'll create a simple car shape with primitives
  
  const pullOver = isDrowsy;
  
  return (
    <group position={[0, 0, 0]} scale={[0.02, 0.02, 0.02]}>
      {/* Car body */}
      <mesh position={[0, 0, 0]} 
        scale={pullOver ? [1, 1, 1] : [1, 1, 1]}
        receiveShadow
        castShadow>
        <boxGeometry args={[10, 3, 20]} />
        <meshStandardMaterial color="#3366cc" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Car cabin */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[8, 2.5, 10]} />
        <meshStandardMaterial color="#1a3a80" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[5, -1.5, 6]} receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-5, -1.5, 6]} receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[5, -1.5, -6]} receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-5, -1.5, -6]} receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Headlights */}
      <mesh position={[3, 0, 10]} receiveShadow castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff00" emissiveIntensity={5} />
      </mesh>
      <mesh position={[-3, 0, 10]} receiveShadow castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff00" emissiveIntensity={5} />
      </mesh>
    </group>
  );
};

const Road = ({ isDaytime }: { isDaytime: boolean }) => {
  return (
    <group position={[0, -2, 0]} rotation={[0, 0, 0]}>
      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 100]} />
        <meshStandardMaterial 
          color={isDaytime ? "#555555" : "#333333"} 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>

      {/* Road lines */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.5, 100]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Side lines */}
      <mesh position={[10, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.5, 100]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-10, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.5, 100]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const StreetLights = ({ isDaytime }: { isDaytime: boolean }) => {
  return (
    <group>
      {/* Left side lights */}
      {Array(5).fill(0).map((_, i) => (
        <group key={`light-left-${i}`} position={[-15, 5, -40 + i * 20]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.2, 10, 8]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <mesh position={[2, 0, 0]} castShadow rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <pointLight
            position={[2, -1, 0]}
            color="#ffffaa"
            intensity={isDaytime ? 5 : 30}
            distance={15}
            castShadow={!isDaytime}
          />
          {!isDaytime && (
            <mesh position={[2, -1, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
            </mesh>
          )}
        </group>
      ))}

      {/* Right side lights */}
      {Array(5).fill(0).map((_, i) => (
        <group key={`light-right-${i}`} position={[15, 5, -40 + i * 20]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.2, 10, 8]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <mesh position={[-2, 0, 0]} castShadow rotation={[0, 0, -Math.PI/2]}>
            <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <pointLight
            position={[-2, -1, 0]}
            color="#ffffaa"
            intensity={isDaytime ? 5 : 30}
            distance={15}
            castShadow={!isDaytime}
          />
          {!isDaytime && (
            <mesh position={[-2, -1, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

const Landscape = ({ isDaytime }: { isDaytime: boolean }) => {
  return (
    <group>
      {/* Trees on left side */}
      {Array(15).fill(0).map((_, i) => (
        <group key={`tree-left-${i}`} position={[-20 - Math.random() * 15, 0, -50 + i * 10 + Math.random() * 5]}>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[3, 6, 8]} />
            <meshStandardMaterial color={isDaytime ? "#2d6a4f" : "#1a472a"} />
          </mesh>
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
            <meshStandardMaterial color="#5c4033" />
          </mesh>
        </group>
      ))}

      {/* Trees on right side */}
      {Array(15).fill(0).map((_, i) => (
        <group key={`tree-right-${i}`} position={[20 + Math.random() * 15, 0, -50 + i * 10 + Math.random() * 5]}>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[3, 6, 8]} />
            <meshStandardMaterial color={isDaytime ? "#2d6a4f" : "#1a472a"} />
          </mesh>
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
            <meshStandardMaterial color="#5c4033" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const CarAnimation: React.FC<CarAnimationProps> = ({ isDaytime, isDrowsy }) => {
  const [carPosition, setCarPosition] = useState<[number, number, number]>([0, -1, 0]);
  
  // Apply pull-over animation when drowsy
  useEffect(() => {
    if (isDrowsy) {
      // Animate pulling over to the right
      setCarPosition([5, -1, 0]);
    } else {
      // Reset to center of road
      setCarPosition([0, -1, 0]);
    }
  }, [isDrowsy]);

  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-sky-400 to-sky-200 dark:from-night-dark dark:to-night relative overflow-hidden rounded-lg">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 60 }}>
        {/* Environment lighting */}
        <fog attach="fog" color={isDaytime ? "#e0f2fe" : "#0f172a"} near={30} far={100} />
        <ambientLight intensity={isDaytime ? 1 : 0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={isDaytime ? 3 : 0.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        
        {/* Moon/Sun */}
        <mesh position={[50, 30, -60]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshStandardMaterial 
            color={isDaytime ? "#fffbeb" : "#f8fafc"} 
            emissive={isDaytime ? "#fffbeb" : "#f8fafc"}
            emissiveIntensity={isDaytime ? 1 : 0.7}
          />
        </mesh>
        
        {/* Add environment components */}
        <group position={[0, 0, 0]}>
          <Road isDaytime={isDaytime} />
          <StreetLights isDaytime={isDaytime} />
          <Landscape isDaytime={isDaytime} />
          
          {/* Position the car */}
          <group position={carPosition}>
            <CarModel isDrowsy={isDrowsy} />
          </group>
        </group>
        
        {/* Controls and environment */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Environment preset={isDaytime ? "sunset" : "night"} />
      </Canvas>
    </div>
  );
};

export default CarAnimation;
