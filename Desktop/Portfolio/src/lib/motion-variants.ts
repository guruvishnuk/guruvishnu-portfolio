import { Variants } from 'motion/react';
import { SIGNATURE_EASE } from './utils';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: SIGNATURE_EASE,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: SIGNATURE_EASE,
    },
  },
};

export const lineReveal: Variants = {
  hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: SIGNATURE_EASE,
    },
  },
};
