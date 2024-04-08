"use client";
import { TwitchChatClient } from "@/classes/TwitchChatClient";
import { useRef } from "react";

function useTwitchChat(channelName: string) {
  const clientRef = useRef(new TwitchChatClient(channelName).connect());
  return clientRef.current;
}

export { useTwitchChat };
