"use client";

import { motion } from 'framer-motion';
import { pageAnimationVariants } from '@/lib/animations';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageAnimationVariants}
      className={`min-h-screen bg-background ${className}`}
    >
      {children}
    </motion.div>
  );
} 