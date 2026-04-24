import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="mx-auto flex w-lg flex-col">
      <h1 className="self-center text-2xl font-bold">Framer Motion Practice</h1>
      <nav className="my-16">
        <ul className="flex justify-start gap-8 rounded-lg bg-stone-800 px-8 py-4">
          <li>
            <Link to="/basics" className="link">
              Basics
            </Link>
          </li>
          <li>
            <Link to="/experiments" className="link">
              Experiments
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
