import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ContainerScrollAnimationProps {
  children: React.ReactNode;
  titleComponent: React.ReactNode;
}

export const ContainerScrollAnimation: React.FC<ContainerScrollAnimationProps> = ({
  children,
  titleComponent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Only use subtle opacity fade - removed tilt, rotation, and perspective transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div
      ref={containerRef}
      className="relative h-[120vh] flex items-center justify-center"
    >
      <div className="w-full relative">
        <motion.div
          style={{
            opacity,
          }}
          className="w-full"
        >
          <div className="mb-8 text-center">
            {titleComponent}
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};
