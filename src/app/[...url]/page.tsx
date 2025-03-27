import { ChatWrapper } from "@/components/Chat/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

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
  const reconstructedURL = reconstructUrl({ url: params.url as string[] });

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedURL
  );

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedURL,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", reconstructedURL);
  }

  return <ChatWrapper sessionId={String(params.url)} />;
}
