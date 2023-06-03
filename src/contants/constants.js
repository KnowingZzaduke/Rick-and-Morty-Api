export const cardVariants = {
  offscreen: {
    y: 200,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    trasition: {
      type: "spring",
      bounce: 0.4,
      duration: 2,
      delay: 2000,
    },
  },
};
