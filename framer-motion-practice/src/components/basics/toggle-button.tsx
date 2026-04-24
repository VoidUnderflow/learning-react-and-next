import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ToggleButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex h-40 w-20 flex-col items-center">
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            className="h-20 w-20 rounded-md bg-lime-300"
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="absolute right-0 bottom-0 left-0 rounded-md bg-white p-3 font-bold text-black"
        onClick={() => setIsVisible(!isVisible)}
        whileTap={{ y: 0.1 }}
      >
        {isVisible ? "Hide" : "Show"}
      </motion.button>
    </div>
  );
}
