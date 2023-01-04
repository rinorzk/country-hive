import React from "react";
import { useEditorJs } from "@/base/hooks/use-editor-js";
import { RichTextEditorProps } from "./types";

export default function RichtextEditor({
  content,
  communityId,
  readOnly = false,
}: RichTextEditorProps) {
  const { saving, doneSaving } = useEditorJs({
    communityId,
    content,
    readOnly,
  });

  return (
    <section>
      <div id="editorjs" style={{ width: "100%" }} />
    </section>
  );
}
