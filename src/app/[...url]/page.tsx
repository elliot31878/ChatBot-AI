import { ChatWrapper } from "@/components/Wrapper/ChatWrapper";
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

  return <ChatWrapper sessionId={sessionId} defaultMessages={[]} />;
}
