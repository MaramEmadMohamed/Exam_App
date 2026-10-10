import { useEffect, useState } from "react";

export function useCountdown(isActive: boolean) {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (!isActive || secondsRemaining === 0) return;

    const timer = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isActive, secondsRemaining]);

  return {
    secondsRemaining,
    startCountdown: setSecondsRemaining,
  };
}
