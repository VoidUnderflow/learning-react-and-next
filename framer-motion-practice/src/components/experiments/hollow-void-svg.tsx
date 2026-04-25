import { motion } from "motion/react";

export default function HollowVoidSvg() {
  return (
    <div className="relative flex h-32 w-full flex-col items-center">
      <svg
        width={600}
        height={200}
        viewBox="0 0 600 200"
        className="absolute top-0"
      >
        <motion.text
          fontWeight="bold"
          fontSize="128px"
          stroke="white"
          strokeWidth={1}
          x="50%"
          y="70%"
          textAnchor="middle"
          animate={{ fontSize: [128, 131, 128] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.1, 1],
          }}
        >
          VOID
        </motion.text>
      </svg>
    </div>
  );
}
