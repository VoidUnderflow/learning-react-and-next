import { DropdownSettings } from "./components/DropdownSettings";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 p-6">
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
