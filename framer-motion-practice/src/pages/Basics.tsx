import Counter from "../components/basics/counter";

export default function Basics() {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold">Basics</h2>
      <p>Counter</p>
      <Counter />
    </div>
  );
}
