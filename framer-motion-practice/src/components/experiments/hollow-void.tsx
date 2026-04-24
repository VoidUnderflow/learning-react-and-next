import { motion } from "motion/react";

export default function HollowVoid() {
  return (
    <motion.h1
      className="text-9xl font-bold text-transparent [-webkit-text-stroke:1px_white]"
      animate={{ fontSize: ["8rem", "8.2rem", "8rem"] }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
        times: [0, 0.1, 1],
      }}
    >
      VOID
    </motion.h1>
  );
}
