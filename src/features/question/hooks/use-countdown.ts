// features/questions/hooks/use-countdown.ts
import { useEffect, useRef, useState } from "react";

export function useCountdown(totalSeconds: number, onFinish?: () => void) {
  const onFinishRef = useRef(onFinish);
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const endAt = Date.now() + totalSeconds * 1000;

    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(left);

      if (left === 0) {
        clearInterval(id);
        onFinishRef.current?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [totalSeconds]);

  return { remaining, total: totalSeconds };
}