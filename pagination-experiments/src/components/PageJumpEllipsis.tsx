import { useState } from "react";
import { z } from "zod";
import { PaginationEllipsis } from "@/components/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface PageJumpEllipsisProps {
    maxPage: number;
    setPage: (page: number) => void;
}

const pageSchema = (maxPage: number) =>
    z.coerce.number().int().min(1).max(maxPage);

export function PageJumpEllipsis({ maxPage, setPage }: PageJumpEllipsisProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    function handleJump() {
        const result = pageSchema(maxPage).safeParse(value);

        if (result.success) setPage(result.data);
        setOpen(false);
        setValue("");
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <span className="cursor-pointer">
                    <PaginationEllipsis />
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-2">
                <Input
                    autoFocus
                    type="text"
                    placeholder="Page #"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleJump}
                    onKeyDown={(e) => e.key === "Enter" && handleJump()}
                    className="h-8 text-center text-sm"
                />
            </PopoverContent>
        </Popover>
    );
}
