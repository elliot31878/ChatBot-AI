import { ChatWrapper } from "@/components/Wrapper/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

export default async function Page({ params }: PageProps) {
  if (!params?.url) {
    return null;
  }
  const sessionCookie = (await cookies()).get("sessionId")?.value;

  const reconstructedURL = reconstructUrl({ url: params?.url as string[] });
  const sessionId = (reconstructedURL + "__" + sessionCookie).replace(
    /\//g,
    ""
  );

  const messagesInHistory = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <ChatWrapper sessionId={sessionId} defaultMessages={messagesInHistory} />
  );
}
