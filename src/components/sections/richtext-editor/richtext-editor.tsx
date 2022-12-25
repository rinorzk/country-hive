import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import { useThrottleCallback } from "@react-hook/throttle";

const EDITOR_JS_TOOLS = {
  list: {
    class: List,
    inlineToolbar: true,
  },
};

export default function RichtextEditor({}: {}) {
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [saving, setSaving] = useState(false);
  const [doneSaving, setDoneSaving] = useState(false);

  const save = useThrottleCallback(async () => {
    if (editor.current) {
      const data = await editor.current.save();

      setSaving(true);
      setDoneSaving(false);

      // await saveEditor(docId, { content: data });

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
      tools: EDITOR_JS_TOOLS,
      holder: "editorjs",
      data: content,
      autofocus: true,
      placeholder: "Let it be known.",
      onChange: save,
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
