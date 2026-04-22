import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="w-lg mx-auto flex flex-col">
      <h1 className="text-2xl font-bold self-center">Framer Motion Practice</h1>
      <nav className="my-16">
        <ul className="flex py-4 bg-stone-800 rounded-lg px-8">
          <li>
            <Link
              to="/basics"
              className="text-blue-300 visited:text-purple-400 underline"
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
