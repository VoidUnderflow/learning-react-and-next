export const dynamic = "force-dynamic"; // Forces the page to be rendered on the server.

import ToolsCards from "@/components/tool-cards";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <ToolsCards />
    </div>
  );
}
