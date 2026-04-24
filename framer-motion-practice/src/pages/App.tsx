import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="mx-auto flex w-lg flex-col">
      <h1 className="self-center text-2xl font-bold">Framer Motion Practice</h1>
      <nav className="my-16">
        <ul className="flex rounded-lg bg-stone-800 px-8 py-4">
          <li>
            <Link
              to="/basics"
              className="text-blue-300 underline visited:text-purple-400"
            >
              Basics
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
