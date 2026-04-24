import Counter from "../components/basics/counter";
import { motion } from "motion/react";
import ToggleButton from "../components/basics/toggle-button";

export default function Basics() {
  return (
    <div className="items-center flex flex-col gap-4">
      <h2 className="text-xl font-bold">Basics</h2>
      <p>Counter</p>
      <Counter />
      <p>Tiny things</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Opacity?
      </motion.div>
      <motion.button
        className="p-3 bg-white text-black font-bold rounded-md"
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
        className="bg-white text-black rounded-md font-bold p-3"
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
    </div>
  );
}
