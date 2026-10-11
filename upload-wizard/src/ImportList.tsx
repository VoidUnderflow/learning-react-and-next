import type { ImportType } from "./importTypes.ts";
import { useEffect, useState } from "react";
import { useWizardStore } from "./store/useWizardStore.ts";
import { Label, ListBox, ListBoxItem, SearchField, Typography } from "@heroui/react";

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
    <div className={"flex flex-col gap-4"}>
      <SearchField value={search} onChange={setSearch}>
        <Label className={"typography typography--h4"}>Filter import types</Label>
        <SearchField.Group>
          <SearchField.Input placeholder={"Search..."} />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      {filteredTypes.length > 0 ? (
        <ListBox
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
