import React from "react";
import { useEditorJs } from "@/base/hooks/use-editor-js";
import { RichTextEditorProps } from "./types";
import styles from "./richtext-editor.module.scss";

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
    <section className={styles.richTextEditor}>
      <div id="editorjs" style={{ width: "100%", textAlign: "left" }} />
    </section>
  );
}
