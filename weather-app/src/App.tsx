import { DropdownSettings } from "./components/DropdownSettings";

function App() {
  return (
    <div className="text-neutral-0 min-h-screen bg-neutral-900 px-16 py-8">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <img src="images/logo.svg"></img>
        </div>
        <DropdownSettings />
      </div>
    </div>
  );
}

export default App;
