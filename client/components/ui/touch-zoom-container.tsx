import React, { useRef, useState } from "react";
import { usePinch } from "@/hooks/use-gestures";
import { cn } from "@/lib/utils";

interface TouchZoomContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  minScale?: number;
  maxScale?: number;
}

export function TouchZoomContainer({
  className,
  children,
  minScale = 1,
  maxScale = 2.5,
  ...props
}: TouchZoomContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  usePinch(ref, {
    onPinch: (s) => {
      const next = Math.min(Math.max(minScale, s), maxScale);
      setScale(next);
    },
    onPinchEnd: () => {
      // Snap back gently if zoomed slightly
      if (scale < 1.05) setScale(1);
    },
  });

  return (
    <div
      ref={ref}
      className={cn("relative touch-pan", className)}
      onDoubleClick={() => setScale(1)}
      {...props}
    >
      <div
        className="transition-transform duration-150 will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
