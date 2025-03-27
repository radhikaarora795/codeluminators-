
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const staggeredFadeIn = (staggerChildren: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren
    }
  }
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const slideIn = (direction: "left" | "right" | "up" | "down") => {
  const x = direction === "left" ? -20 : direction === "right" ? 20 : 0;
  const y = direction === "up" ? -20 : direction === "down" ? 20 : 0;
  
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
};

export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Ripple animation for button clicks
export const ripple = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
    scale: 1.5,
    opacity: 0,
    transition: { duration: 0.8 }
  }
};
