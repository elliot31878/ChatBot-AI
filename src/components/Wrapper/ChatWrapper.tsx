"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";

import { CHAT_API_URL } from "@/constants/chat.constant";

import { Message, useChat } from "@ai-sdk/react";
import { ChatMessages } from "../Messages/ChatMessages";
import { ChatInput } from "../ChatInput/ChatInput";
import ErrorBar from "../ErrorBar/ErrorBar";

export type TStatus = ReturnType<typeof useChat>["status"];
export type TError = ReturnType<typeof useChat>["error"];

interface IHistoryMessageList {
  key: string;
  messages: Message[];
}

export function ChatWrapper({ sessionId }: { sessionId: string }) {
  const [defaultMessages, setDefaultMessages] = useState<Message[]>([]);
  useLayoutEffect(() => {
    const messagesHistory = String(localStorage.getItem("messages"));
    const messages = JSON.parse(messagesHistory) as IHistoryMessageList[];

    console.log("session=> ", sessionId, messages);
    const getMessage: Message[] =
      messagesHistory?.length > 0
        ? (messages?.find((item) => item.key === sessionId)
            ?.messages as Message[])
        : [];
    setDefaultMessages(getMessage);
  }, [sessionId]);
  const {
    messages,
    handleInputChange,
    input,
    handleSubmit,
    setInput,
    status,
    error,
  } = useChat({
    api: CHAT_API_URL,
    body: { sessionId },
    initialMessages: defaultMessages,
  });

  useEffect(() => {
    const value = localStorage.getItem("messages");
    if (value) {
      let prevData = JSON.parse(value) as IHistoryMessageList[];

      prevData = prevData.filter((item) => item.key !== sessionId);
      prevData.push({ key: sessionId, messages });

      localStorage.setItem("messages", JSON.stringify(prevData));
    } else {
      localStorage.setItem(
        "messages",
        JSON.stringify([{ key: sessionId, messages }])
      );
    }
  }, [messages, sessionId]);

  return (
    <main className="relative min-h-full bg-zinc-800 flex divide-y divide-zinc-700 flex-col justify-between gap-2 pt-4">
      <section className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        <ChatMessages messages={messages} status={status} />
      </section>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        status={status}
      />
      <ErrorBar error={error} />
    </main>
  );
}
