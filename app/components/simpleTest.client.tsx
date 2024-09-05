import { ClientOnly } from "remix-utils/client-only";

function SimpleTest() {
  retutn <h1>Whatever</h1>;
}

function SimplerStaticVersion({ label }: { label?: string }) {
  return <div>{label || "Editor"}: Loading rich text editor...</div>;
}

export function RichTextEditorWrapper(props: RichTextEditorProps) {
  return (
    <ClientOnly fallback={<SimplerStaticVersion label={props.label} />}>
      {() => <SimpleTest {...props} />}
    </ClientOnly>
  );
}
