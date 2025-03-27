import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, sessionId } = await req.json();

  const lastMessage = messages[messages.length - 1].content;

  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  });

  console.log("response=> ", response);

  return aiUseChatAdapter(response);
}
