"use client";

import dynamic from "next/dynamic";

const ChatWrapper = dynamic(() => import("./ChatWrapper"), {
  ssr: false,
});

export default function ChatWrapperClient({
  sessionId,
}: {
  sessionId: string;
}) {
  return <ChatWrapper sessionId={sessionId} />;
}
