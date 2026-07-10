"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MarkdownEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function MarkdownEditor({
  name,
  defaultValue,
  placeholder,
  rows = 12,
  required,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleImageUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("posts-images")
        .upload(fileName, file);

      if (uploadError) {
        alert("上传失败：" + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("posts-images")
        .getPublicUrl(fileName);

      const imageMarkdown = `\n![${file.name}](${urlData.publicUrl})\n`;
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      textarea.value =
        text.slice(0, start) + imageMarkdown + text.slice(end);

      textarea.selectionStart = textarea.selectionEnd =
        start + imageMarkdown.length;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.focus();
    };

    input.click();
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleImageUpload}
        >
          <ImageUp className="h-4 w-4" />
          插入图片
        </Button>
        <span className="text-xs text-muted-foreground">
          支持 Markdown 语法
        </span>
      </div>
      <Textarea
        ref={textareaRef}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="font-mono text-sm"
      />
    </div>
  );
}
