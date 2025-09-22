import { useCallback, useEffect, useRef } from "react";

export interface UseLongPressOptions {
  delay?: number; // ms
  onLongPress?: (event: MouseEvent | TouchEvent) => void;
  onCancel?: () => void;
}

export function useLongPress({
  delay = 500,
  onLongPress,
  onCancel,
}: UseLongPressOptions) {
  const timer = useRef<number | null>(null);
  const targetRef = useRef<EventTarget | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    onCancel?.();
  }, [onCancel]);

  const start = useCallback(
    (e: MouseEvent | TouchEvent) => {
      targetRef.current = e.target as EventTarget;
      clear();
      timer.current = window.setTimeout(() => {
        onLongPress?.(e);
        timer.current = null;
      }, delay);
    },
    [clear, delay, onLongPress],
  );

  useEffect(() => () => clear(), [clear]);

  return {
    onMouseDown: (e: React.MouseEvent) => start(e.nativeEvent),
    onMouseUp: () => clear(),
    onMouseLeave: () => clear(),
    onTouchStart: (e: React.TouchEvent) => start(e.nativeEvent),
    onTouchEnd: () => clear(),
    onTouchCancel: () => clear(),
  } as const;
}
