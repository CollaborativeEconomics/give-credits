import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

interface ParallaxLayerProps {
  speed: number;
  blurMultiplier: number; // Added blurMultiplier to control the amount of blur
  children: React.ReactNode;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  speed,
  blurMultiplier,
  children
}) => {
  const [offset, setOffset] = useState(0);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newOffset = window.pageYOffset * speed;
      setOffset(newOffset);

      // Calculate blur based on scroll position
      const newBlur = Math.min(10, Math.abs(newOffset) * blurMultiplier);
      setBlur(newBlur);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, blurMultiplier]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full"
      style={{
        transform: `translateY(${offset}px)`,
        filter: `blur(${blur}px)`
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

const TitleComponent = () => {
  return (
    <div className='text-white shadow-xl'>
      <h1 className="text-7xl font-bold">Donate Carbon Credits</h1>
      <p className="text-3xl">
        Make tax-deductible donations of carbon credits to worthy non-profits
      </p>
    </div>
  );
};

const layers = [
  { src: '/home/Hero/Layer5.jpg' },
  { src: '/home/Hero/Layer4.png' },
  { src: '/home/Hero/Layer3.png' },
  { src: TitleComponent },
  { src: '/home/Hero/Layer2.png' },
  { src: '/home/Hero/Layer1.png' }
];

const ParallaxExample: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={index * 0.05}
          blurMultiplier={index * 0.001}
        >
          {typeof layer.src === 'function' ? (
            <layer.src />
          ) : (
            <Image
              src={layer.src}
              layout="fill"
              objectFit="cover"
              alt="jungle background"
            />
          )}
        </ParallaxLayer>
      ))}
    </div>
  );
};

export default ParallaxExample;
