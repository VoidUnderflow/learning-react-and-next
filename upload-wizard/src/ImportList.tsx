import type { ImportType } from "./importTypes.ts";
import { useEffect, useState } from "react";
import { useWizardStore } from "./store/useWizardStore.ts";
import { Label, ListBox, ListBoxItem, SearchField, Separator, Typography } from "@heroui/react";

interface ImportListProps {
  importTypes: ImportType[];
}

export default function ImportList({ importTypes }: ImportListProps) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    return useWizardStore.subscribe((state, previousState) => {
      if (state.stage === "select-import-type" && state.stage !== previousState.stage) {
        setSearch("");
      }
    });
  }, []);

  const selectedTypeId = useWizardStore((state) => state.selectedTypeId);
  const isImporting = useWizardStore((state) => state.isImporting);
  const selectImportType = useWizardStore((state) => state.selectImportType);

  // Filter displayed items based on user input.
  const filteredTypes = importTypes.filter((type) =>
    type.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className={"flex flex-col"}>
      <SearchField aria-label="Filter import types" value={search} onChange={setSearch} className="flex h-20 shrink-0 justify-center px-4">
        <SearchField.Group className="border-accent!">
          <SearchField.SearchIcon aria-hidden="true" />
          <SearchField.Input placeholder={"Search..."} />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <Separator className="h-px" />
      {filteredTypes.length > 0 ? (
        <ListBox
          className={"p-4"}
          aria-label="Import types"
          disallowEmptySelection
          disabledKeys={isImporting ? importTypes.map((type) => type.id) : []}
          selectionMode={"single"}
          selectedKeys={selectedTypeId ? [selectedTypeId] : []}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const id = keys.values().next().value;
            if (typeof id === "string") {
              selectImportType(id);
              setSearch("");
            }
          }}
        >
          {filteredTypes.map((type) => (
            <ListBoxItem key={type.id} id={type.id} textValue={type.name}>
              <Label>{type.name}</Label>
              <ListBox.ItemIndicator />
            </ListBoxItem>
          ))}
        </ListBox>
      ) : (
        <Typography.Paragraph size={"sm"} color={"muted"}>
          No matching import types.
        </Typography.Paragraph>
      )}
    </div>
  );
}
