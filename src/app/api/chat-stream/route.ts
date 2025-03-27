import { ragChat } from "@/lib/rag-chat";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, sessionId } = await req.json();

  const lastMessage = messages[messages.length - 1].content;

  const response = await ragChat.chat(lastMessage);
  console.log("response=> ", response);
}
