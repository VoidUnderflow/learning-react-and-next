import { motion } from "motion/react";

export default function HollowVoidSvg() {
  return (
    <div className="relative flex h-32 w-full flex-col items-center">
      <svg
        // width, height = just like a div
        width={600}
        height={200}
        // SVG's internal coord system: min-x min-y width height
        // min_x min_y -> (0, 0) = origin, top left
        // Oy points downwards
        viewBox="0 0 600 200"
        className="absolute top-0"
      >
        <motion.text
          fontWeight="bold"
          fontSize="128px"
          stroke="white"
          strokeWidth={1}
          // Horizontal position of the text anchor point.
          // 50% -> halfway across the viewBox width, but start point may differ.
          x="50%"
          // Vertical position of the text anchor point.
          // y = text bottom
          y="70%"
          // which part of the text does x refer to?
          // start => x == left edge of the text
          // middle => x == horizontal center of the text
          // end => x == right edge
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
