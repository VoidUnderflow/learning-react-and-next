import { useState } from "react";

interface AddItemProps {
  onAdd: (text: string) => void;
}

export default function AddItem({ onAdd }: AddItemProps) {
  const [text, setText] = useState("");

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && text.trim() !== "") {
      onAdd(text);
      setText("");
    }
  }

  return (
    <input
      className="bg-todo-bgColor placeholder-neutralColor text-activeColor p-4 rounded-md shadow-lg w-full my-8 hover:outline-none focus:outline-none"
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Create a new todo..."
    />
  );
}
