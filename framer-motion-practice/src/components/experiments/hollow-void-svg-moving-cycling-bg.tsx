import {
  motion,
  useAnimate,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { useEffect, useState } from "react";

const images = [
  {
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_Sky_129S.jpg",
    text: "Sky",
  },
  {
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_Sky_146S.jpg",
    text: "Space",
  },
  {
    href: "https://texturelabs.org/wp-content/uploads/Texturelabs_Soil_148S.jpg",
    text: "Ground",
  },
];

export default function HollowVoidSvgMovingCyclingBg() {
  // images idx
  const [currentIdx, setCurrentIdx] = useState(0);

  // controls background image motion
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);

  // target font size, opacity for the current animation
  const fontSize = useMotionValue(128);
  const groupOpacity = useMotionValue(1);

  useAnimationFrame((time) => {
    const radius = 150;
    const speed = 0.0001;
    const angle = (time * speed) % (Math.PI * 2);

    bgX.set(Math.cos(angle) * radius);
    bgY.set(Math.sin(angle) * radius);
  });

  // control animation more thoroughly
  const [, animate] = useAnimate();

  // bg change loop
  useEffect(() => {
    let cancelled = false;

    async function bgLoop() {
      while (!cancelled) {
        // wait 2s with current bg
        await new Promise((resolve) => setTimeout(resolve, 4000));

        await Promise.all([
          // pulse expansion
          animate(fontSize, 129, { duration: 0.1, ease: "easeIn" }),

          // fade to black
          animate(groupOpacity, 0, { duration: 0.1 }),
        ]);

        // switch to the next image
        setCurrentIdx((idx) => (idx + 1) % images.length);

        await Promise.all([
          // Fade in new image.
          await animate(groupOpacity, 1, { duration: 0.2 }),

          // Expand back to normal(?) not exactly what I asked for
          await animate(fontSize, 128, { duration: 0.2, ease: "easeOut" }),
        ]);
      }
    }

    bgLoop();
    return () => {
      cancelled = true;
    };
  }, [animate, fontSize, groupOpacity]);

  const textProps = {
    x: "50%",
    y: "70%",
    textAnchor: "middle" as const,
    fontWeight: "bold",
    fontSize: 128,
    textRendering: "optimizeLegibility" as const,
    fontFamily: "inherit",
    strokeLinejoin: "round" as const,
  };

  return (
    <div className="relative flex h-48 w-full flex-col items-center">
      <svg
        width={600}
        height={200}
        viewBox="0 0 600 200"
        className="absolute top-0"
      >
        <defs>
          <mask id="hvsmcb_mask">
            <rect x="0" y="0" width="600" height="200" fill="black" />
            <motion.text {...textProps} style={{ fontSize }} fill="white">
              VOID
            </motion.text>
          </mask>
        </defs>
        <motion.g mask="url(#hvsmcb_mask)" style={{ opacity: groupOpacity }}>
          <motion.image
            href={images[currentIdx].href}
            width={1920}
            height={1280}
            x={-660}
            y={-540}
            style={{
              x: bgX,
              y: bgY,
            }}
          />
        </motion.g>
        <motion.text
          stroke="white"
          strokeWidth={1.5}
          {...textProps}
          fill="none"
          style={{ fontSize }}
        >
          VOID
        </motion.text>
      </svg>
      <motion.p
        className="absolute bottom-0"
        key={currentIdx}
        style={{ opacity: groupOpacity }}
      >
        {images[currentIdx].text}
      </motion.p>
    </div>
  );
}
