import clsx from "clsx";
import { Item } from "../App";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Checkbox from "./Checkbox";
import IconCross from "../assets/icons/icon-cross.svg?react";

interface ListItemProps {
  item: Item;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function ListItem({ item, onRemove, onToggle }: ListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "flex items-center border-b-1 border-inactiveColor justify-between p-4 bg-todo-bgColor hover:outline-none focus:outline-none",
        {
          "cursor-grabbing": isDragging,
        }
      )}
    >
      <div
        className={clsx("flex items-center gap-8", {
          "text-activeColor": item.status === "active",
          "text-inactiveColor": item.status === "completed",
        })}
      >
        <Checkbox
          checked={item.status === "completed"}
          id={item.id}
          onToggle={onToggle}
        />

        <span className={clsx({ "line-through": item.status === "completed" })}>
          {item.text}
        </span>
      </div>
      <button
        className="block sm:hidden sm:[li:hover_&]:block cursor-pointer"
        onClick={() => onRemove(item.id)}
      >
        <IconCross />
      </button>
    </li>
  );
}
