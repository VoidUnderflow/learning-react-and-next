import { useState } from "react";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import BackgroundImage from "./components/BackgroundImage";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
  fetchTodos,
} from "./apiOps";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ThemeToggleButton from "./components/ThemeToggleButton";

export type DisplayMode = "all" | "active" | "completed";
export type ItemStatus = "active" | "completed";
export type Item = {
  id: number;
  text: string;
  status: ItemStatus;
};

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all");
  const queryClient = useQueryClient();
  const { data: items } = useQuery<Item[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialData: [],
  });

  const addMutation = useMutation<Item, Error, string, { previous: Item[] }>({
    mutationFn: createTodo,
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previous = queryClient.getQueryData<Item[]>(["todos"]) || [];
      const optimistic: Item = { id: Date.now(), text, status: "active" };
      queryClient.setQueryData(["todos"], [...previous, optimistic]);
      return { previous };
    },
    onError: (_err, _text, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["todos"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutation = useMutation<
    Item,
    Error,
    { id: number; status: ItemStatus },
    { previous: Item[] }
  >({
    mutationFn: ({ id, status }) => updateTodo(id, { status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previous = queryClient.getQueryData<Item[]>(["todos"]) || [];
      queryClient.setQueryData(
        ["todos"],
        previous.map((t) => (t.id === id ? { ...t, status } : t))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["todos"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation<void, Error, number, { previous: Item[] }>(
    {
      mutationFn: deleteTodo,
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ["todos"] });
        const previous = queryClient.getQueryData<Item[]>(["todos"]) || [];
        queryClient.setQueryData(
          ["todos"],
          previous.filter((t) => t.id !== id)
        );
        return { previous };
      },
      onError: (_err, _id, context) => {
        if (context?.previous) {
          queryClient.setQueryData(["todos"], context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    }
  );

  const clearCompletedMutation = useMutation<
    void,
    Error,
    void,
    { previous: Item[] }
  >({
    mutationFn: () => deleteCompleted(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previous = queryClient.getQueryData<Item[]>(["todos"]) || [];
      queryClient.setQueryData(
        ["todos"],
        previous.filter((t) => t.status !== "completed")
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["todos"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const activeCount = items.filter((item) => item.status === "active").length;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id.toString() === active.id
    );
    const newIndex = items.findIndex((item) => item.id.toString() === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    queryClient.setQueryData(["todos"], reordered);
  }

  return (
    <div className="w-full h-screen bg-bgColor overflow-hidden relative px-8">
      <BackgroundImage />
      <div className="relative z-1 container mx-auto flex flex-col items-center max-w-lg bg-image bg-no-repeat">
        <div className="flex justify-between w-full mt-16 items-center">
          <h1 className="text-white text-4xl font-bold tracking-[0.5em] ">
            TODO
          </h1>
          <ThemeToggleButton />
        </div>

        <AddItem onAdd={(text) => addMutation.mutate(text)} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <ul className="bg-todo-bgColor todo-rounded-md overflow-hidden shadow-md w-full">
              {items
                .filter(
                  (item) => displayMode === "all" || item.status === displayMode
                )
                .map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    onRemove={(id) => deleteMutation.mutate(id)}
                    onToggle={(id) => {
                      const current = items.find((item) => item.id === id);
                      if (current)
                        toggleMutation.mutate({
                          id,
                          status:
                            current.status === "active"
                              ? "completed"
                              : "active",
                        });
                    }}
                  />
                ))}
            </ul>
          </SortableContext>
        </DndContext>

        <div className="w-full flex flex-col gap-y-4 bg-transparent sm:flex-row sm:gap-x-4 sm:gap-y-0 sm:bg-todo-bgColor sm:p-4 sm:justify-between sm:rounded-md sm:shadow-md">
          <div className="flex justify-between items-center bg-todo-bgColor p-4 sm:p-0 sm:contents sm:bg-transparent shadow-md sm:shadow-none rounded-b-md sm:rounded-b-none">
            <p className="sm:order-1 text-neutralColor">
              {activeCount} items left
            </p>
            <button
              className="sm:order-3 text-neutralColor cursor-pointer"
              onClick={() => clearCompletedMutation.mutate()}
            >
              Clear completed
            </button>
          </div>

          <div className="h-4 bg-transparent sm:hidden" />

          <div className="flex justify-center items-center bg-todo-bgColor p-4 sm:contents sm:bg-transparent sm:p-0 rounded-md shadow-md sm:rounded-none sm:shadow-none">
            <div className="flex gap-x-2 sm:order-2 text-activeColor">
              <button
                className="display-button"
                onClick={() => setDisplayMode("all")}
              >
                All
              </button>
              <button
                className="display-button"
                onClick={() => setDisplayMode("active")}
              >
                Active
              </button>
              <button
                className="display-button"
                onClick={() => setDisplayMode("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-neutralColor">Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}

export default App;
