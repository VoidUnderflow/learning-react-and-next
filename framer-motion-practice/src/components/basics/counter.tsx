import { useMotionValue, useTransform, animate, motion } from "motion/react";
import { useEffect } from "react";

export default function Counter() {
  // Counter variable.
  const count = useMotionValue(0);

  // count.get -> gets current state of the motion value
  // maps count to a rounded count
  /**
   * The example given in the remark for the function:
   *   const { opacity, scale } = useTransform(x, [0, 100], {
        opacity: [0, 1],
        scale: [0.5, 1]
        })
     As x varies from 0 to 100, opacity varies from 0 to 1 and scale from 0.5 to 1.
   */
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 1000, { duration: 10 });
    return () => controls.stop();
  }, [count]);

  // <pre> is actually a standard HTML tag, huh TIL
  return (
    <motion.pre className="text-2xl text-blue-500 mx-auto">
      {rounded}
    </motion.pre>
  );
}
