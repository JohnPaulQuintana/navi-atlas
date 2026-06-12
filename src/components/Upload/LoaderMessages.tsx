import { useEffect, useState } from "react";

interface LoaderMessagesProps {
  message: string | null;
}

export default function LoaderMessages({ message }: LoaderMessagesProps) {
  const [visible, setVisible] = useState(false);
  const [displayMsg, setDisplayMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    // Fade out previous message
    setVisible(false);

    const timeout = setTimeout(() => {
      // Update message and fade in
      setDisplayMsg(message);
      setVisible(true);
    }, 200); // fade out duration

    return () => clearTimeout(timeout);
  }, [message]);

  if (!displayMsg) return null;

  return (
    <p
      className={`mt-4 text-white/70 text-lg font-medium transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayMsg}
    </p>
  );
}