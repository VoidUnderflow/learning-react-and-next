import Counter from "../components/basics/counter";
import { motion } from "motion/react";
import ToggleButton from "../components/basics/toggle-button";
import KeyFrames from "../components/basics/keyframes";
import GestureButton from "../components/basics/gesture-button";

export default function Basics() {
  return (
    <div className="page-layout">
      <h2>Basics</h2>
      <p>Counter</p>
      <Counter />
      <p>Tiny things</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Opacity?
      </motion.div>
      <motion.button
        className="rounded-md bg-white p-3 font-bold text-black"
        initial={{
          maskImage: "linear-gradient(to right, black 0%, transparent 0%)",
        }}
        animate={{
          maskImage: "linear-gradient(to right, black 100%, transparent 100%)",
        }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        Neat transition
      </motion.button>
      <motion.button
        className="rounded-md bg-white p-3 font-bold text-black"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Another button
      </motion.button>
      <p>Toggle button</p>
      <ToggleButton />
      <p>Keyframes</p>
      <KeyFrames />
      <p>Button with gestures</p>
      <GestureButton />
    </div>
  );
}
