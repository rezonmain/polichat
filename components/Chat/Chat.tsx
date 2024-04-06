"use client";
import { useTwitchChat } from "@/hooks/useTwitchChat";

type ChatProps = {
  messages: string[];
};

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const client = useTwitchChat("hasanabi");
  return (
    <div>
      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
    </div>
  );
};

export { Chat };
