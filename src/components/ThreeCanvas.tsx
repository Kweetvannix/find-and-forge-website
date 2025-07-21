
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

interface TypingData {
  typingSpeed: number;
  inputLength: number;
  isTyping: boolean;
}

interface AnimatedCubeProps {
  typingData: TypingData;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ typingData }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate based on typing speed
      meshRef.current.rotation.y += (typingData.typingSpeed * 0.02 + 0.005) * delta;
      meshRef.current.rotation.x += (typingData.typingSpeed * 0.01 + 0.003) * delta;
      
      // Scale based on input length
      const scaleMultiplier = Math.min(1 + typingData.inputLength * 0.01, 2);
      meshRef.current.scale.setScalar(scaleMultiplier);
      
      // Color changes based on typing activity
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        const intensity = typingData.isTyping ? 1 : 0.5;
        const hue = (typingData.inputLength * 0.01) % 1;
        const material = meshRef.current.material as any;
        if (material.color instanceof Color) {
          material.color.setHSL(hue, 0.7, intensity);
        }
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
};

interface ThreeCanvasProps {
  typingData: TypingData;
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ typingData }) => {
  return (
    <div className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedCube typingData={typingData} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
