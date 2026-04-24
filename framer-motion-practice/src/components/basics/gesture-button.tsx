import { motion } from "motion/react";

export default function GestureButton() {
  return (
    <motion.button
      className="rounded-md bg-white p-3 font-bold text-black"
      whileHover={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
      whileTap={{ backgroundColor: "rgba(200, 200, 200, 1)" }}
    >
      Tap me
    </motion.button>
  );
}
