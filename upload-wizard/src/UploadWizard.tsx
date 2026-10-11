import { useQuery } from "@tanstack/react-query";

export default function UploadWizard() {
  const { data, status } = useQuery({
    queryKey: ["api", "dry-run"],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/dry-run");
      if (!response.ok) throw "Dry run failed.";
      return response.json();
    },
  });

  if (status === "pending") return <div>Pending</div>;
  if (status === "error") return <div>Error</div>;

  return <div>UploadWizard dry-run status: {JSON.stringify(data.canImport!)}</div>;
}
