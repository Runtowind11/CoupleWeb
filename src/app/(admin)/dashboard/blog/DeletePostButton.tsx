"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePost } from "./actions";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const justOpenedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      justOpenedRef.current = true;
      const t = setTimeout(() => {
        justOpenedRef.current = false;
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && justOpenedRef.current) return;
    setOpen(nextOpen);
  };

  const handleConfirm = () => {
    setOpen(false);
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <form ref={formRef} action={deletePost.bind(null, postId)} className="hidden" />
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
        aria-label="删除文章"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              删除后不可恢复（包括文章内图片），确定要删除这篇文章吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleConfirm}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
