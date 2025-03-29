"use client";

import React from "react";

import { CHAT_API_URL } from "@/constants/chat.constant";

import { Message, useChat } from "@ai-sdk/react";
import { ChatMessages } from "../Messages/ChatMessages";
import { ChatInput } from "../ChatInput/ChatInput";
import ErrorBar from "../ErrorBar/ErrorBar";

export type TStatus = ReturnType<typeof useChat>["status"];
export type TError = ReturnType<typeof useChat>["error"];

export function ChatWrapper({
  sessionId,
  defaultMessages,
}: {
  sessionId: string;
  defaultMessages: Message[];
}) {
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
