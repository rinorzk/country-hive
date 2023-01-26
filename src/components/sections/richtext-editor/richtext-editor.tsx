import React, { useEffect } from "react";
import { useEditorJs } from "@/base/hooks/use-editor-js";
import { RichTextEditorProps } from "./types";
import styles from "./richtext-editor.module.scss";

export default function RichtextEditor({
  content,
  readOnly = false,
  onSave,
}: RichTextEditorProps) {
  const { saving, doneSaving, editorData } = useEditorJs({
    content,
    readOnly,
  });

  useEffect(() => {
    if (editorData) {
      onSave(editorData);
    }
  }, [editorData]);

  return (
    <section className={styles.richTextEditor}>
      <div id="editorjs" style={{ width: "100%", textAlign: "left" }} />
    </section>
  );
}
