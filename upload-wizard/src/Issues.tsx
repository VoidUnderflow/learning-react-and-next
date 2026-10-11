import { Button, Modal } from "@heroui/react";

interface IssuesProps {
  kind: "warning" | "error";
  items: string[];
}

export default function Issues({ kind, items }: IssuesProps) {
  if (!items.length) return null;

  const title = kind === "warning" ? "Warnings" : "Errors";
  const color = kind === "warning" ? "text-warning" : "text-danger";

  return (
    <Modal>
      <Button variant="secondary" className={color}>
        {items.length} {kind}{items.length === 1 ? "" : "s"}
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className={color}>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <ul className={`list-disc space-y-2 pl-5 ${color}`}>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
