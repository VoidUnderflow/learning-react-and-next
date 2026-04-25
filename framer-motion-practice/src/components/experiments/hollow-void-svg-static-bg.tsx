import { motion } from "motion/react";

export default function HollowVoidSvgStaticBg() {
  // Extract the text props to avoid duplication.
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
        {/* Defs = "store graphical objects that will be <use>'d at a later time" */}
        <defs>
          {/* The mask defines what shows up. 
          "Compositing the current object into the bg." */}
          <mask id="hvssb_mask">
            {/* Rectangle that covers the whole viewbox. */}
            {/* fill="black" hides things, think of it as transparency / alpha channel */}
            <rect x="0" y="0" width="600" height="200" fill="black" />
            {/* Text mask, same position + fontSize animation. */}
            {/* fill="white" -> fully opaque */}
            <motion.text {...textProps} fill="white">
              VOID
            </motion.text>
          </mask>
        </defs>
        <image
          href="https://texturelabs.org/wp-content/uploads/Texturelabs_Sky_146S.jpg"
          width={600}
          height={200}
          // xMidyMid = where image is positioned within the parent box
          // slice = equivalent to object-fit: cover
          preserveAspectRatio="xMidYMid slice"
          mask="url(#hvssb_mask)"
        />
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
