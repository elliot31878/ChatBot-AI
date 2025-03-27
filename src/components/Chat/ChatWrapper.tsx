"use client";

import { CHAT_API_URL } from "@/app/constants/chat.constant";
import { useChat } from "@ai-sdk/react";

export function ChatWrapper({ sessionId }: { sessionId: string }) {
  const { messages, handleInputChange, input, handleSubmit } = useChat({
    api: CHAT_API_URL,
    body: { sessionId },
  });

  return (
    <main className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <section className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        {JSON.stringify(messages)}
      </section>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          value={input}
          onChange={handleInputChange}
          type="text"
        />
        <button type="submit">send</button>
      </form>
    </main>
  );
}
