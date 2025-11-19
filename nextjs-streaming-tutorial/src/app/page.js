import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-24 bg-black">
      <div>
        <h1 className="text-3xl lg:text-5xl font-bold text-center">
          Next.js Streaming
        </h1>
      </div>
      <Link href="/streaming-demo" prefetch={false}>
        <Button size="lg" className="cursor-pointer">
          Streaming Demo
        </Button>
      </Link>
    </div>
  );
}
