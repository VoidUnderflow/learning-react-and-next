import { motion, useAnimationFrame, useMotionValue } from "motion/react";

export default function HollowVoidSvgMovingBg() {
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);

  useAnimationFrame((time) => {
    const radius = 150;
    const speed = 0.0005;
    const angle = (time * speed) % (Math.PI * 2);

    bgX.set(Math.cos(angle) * radius);
    bgY.set(Math.sin(angle) * radius);
  });

  const textProps = {
    x: "50%",
    y: "70%",
    textAnchor: "middle" as const,
    fontWeight: "bold",
    fontSize: 128,
    textRendering: "optimizeLegibility" as const,
    fontFamily: "inherit",
    strokeLineJoin: "round",
    animate: { fontSize: [128, 131, 128] },
    transition: {
      duration: 1,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatDelay: 2,
      times: [0, 0.1, 1],
    },
  };

  return (
    <div className="relative flex h-32 w-full flex-col items-center">
      <svg
        width={600}
        height={200}
        viewBox="0 0 600 200"
        className="absolute top-0"
      >
        <defs>
          <mask id="hvssb_mask">
            <rect x="0" y="0" width="600" height="200" fill="black" />
            <motion.text {...textProps} fill="white">
              VOID
            </motion.text>
          </mask>
        </defs>
        {/* Need to separate the mask from the image. */}
        {/* Image needs to stay fixed while bg image rotates. */}
        <g mask="url(#hvssb_mask)">
          <motion.image
            href="https://texturelabs.org/wp-content/uploads/Texturelabs_Sky_129S.jpg"
            width={1920}
            height={1280}
            x={-660}
            y={-540}
            style={{
              x: bgX,
              y: bgY,
            }}
          />
        </g>
        <motion.text
          stroke="white"
          strokeWidth={1.5}
          {...textProps}
          fill="none"
        >
          VOID
        </motion.text>
      </svg>
    </div>
  );
}
