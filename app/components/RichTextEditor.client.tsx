import React from "react";
import { ClientOnly } from "remix-utils/client-only";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, BlockStack } from "@shopify/polaris";
import { TextBoldIcon, TextItalicIcon } from "@shopify/polaris-icons";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

function TiptapEditor({ label, value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    console.log("No editor");
    return null;
  }

  return (
    <BlockStack gap="500">
      <BlockStack>
        {/* <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
          size="slim"
          icon={TextBoldIcon}
        />
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          size="slim"
          icon={TextItalicIcon}
        /> */}
      </BlockStack>
      <EditorContent editor={editor} />
    </BlockStack>
  );
}

function SimplerStaticVersion({ label }: { label?: string }) {
  return <div>{label || "Editor"}: Loading rich text editor...</div>;
}

export function RichTextEditorWrapper(props: RichTextEditorProps) {
  return (
    <ClientOnly fallback={<SimplerStaticVersion label={props.label} />}>
      {() => <TiptapEditor {...props} />}
    </ClientOnly>
  );
}
