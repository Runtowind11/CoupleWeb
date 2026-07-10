"use client";

import { useState, useRef, type MouseEvent, type WheelEvent } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

interface LightboxProps {
  src: string;
  alt: string;
}

export default function Lightbox({ src, alt }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(5, Math.max(0.5, prev + delta)));
  }

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleDoubleClick() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="relative my-4 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="flex h-screen w-screen max-w-none items-center justify-center border-0 bg-transparent p-0 shadow-none ring-0">
        <div
          ref={containerRef}
          className="flex h-full w-full items-center justify-center"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          style={{ cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default" }}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] select-none"
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
