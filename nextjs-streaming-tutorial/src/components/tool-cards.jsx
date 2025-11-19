import IconCard from "@/components/ui/icon-card";
import getTools from "@/lib/getTools";
import { Suspense, use } from "react";
import { Skeleton } from "./ui/skeleton";

const ToolsCards = async () => {
  const toolPromises = await getTools();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
        {toolPromises.map((toolPromise, idx) => (
          <Suspense fallback={<Skeleton />} key={idx}>
            <ToolsCard toolPromise={toolPromise} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

const ToolsCard = ({ toolPromise }) => {
  // Use = useEffect + state update, experimental, only works with RSCs.
  const tool = use(toolPromise);

  return <IconCard tool={tool} />;
};

export default ToolsCards;
