import { motion } from "motion/react";

export default function KeyFrames() {
  // duration = total animation time;
  // times = normalised (0-1) checkpoints;
  return (
    <motion.div
      className="h-20 w-20 bg-pink-500"
      animate={{
        scale: [1, 0.5, 0.5, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        ease: "easeIn",
        duration: 6,
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.2, 0.5, 0.7, 1],
      }}
    ></motion.div>
  );
}
