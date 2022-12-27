import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { useThrottleCallback } from "@react-hook/throttle";
import { updateCommunity } from "@/base/lib/community";
import { RichTextEditorProps } from "./types";
import { editorJsTools } from "@/base/config/editor-js";

export default function RichtextEditor({
  content,
  communityId,
  readOnly = false,
}: RichTextEditorProps) {
  const editor = useRef(null);
  const [saving, setSaving] = useState(false);
  const [doneSaving, setDoneSaving] = useState(false);

  const save = useThrottleCallback(async () => {
    if (editor.current) {
      const data = await editor.current.save();

      setSaving(true);
      setDoneSaving(false);

      await updateCommunity(communityId, { intro: data });

      setTimeout(() => {
        setSaving(false);
        setDoneSaving(true);

        setTimeout(() => {
          setDoneSaving(false);
        }, 3000);
      }, 2500);
    }
  }, 30);

  useEffect(() => {
    const editorJs = new EditorJS({
      tools: editorJsTools,
      holder: "editorjs",
      data: content,
      autofocus: true,
      placeholder: "Welcome.",
      onChange: save,
      readOnly: readOnly,
    });

    editor.current = editorJs;

    return () => {
      if (editor.current) {
        try {
          editor.current.destroy();
        } catch {
          console.warn("error destroying editor");
        }
      }
    };
  }, [save, content]);

  return (
    <section>
      <div id="editorjs" style={{ width: "100%" }} />
    </section>
  );
}
