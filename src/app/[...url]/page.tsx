import { ChatWrapper } from "@/components/Wrapper/ChatWrapper";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ url?: string[] }>;
}) {
  const { url } = await params;

  if (!url) return null;

  const sessionCookie = (await cookies()).get("session-id")?.value || "";
  const reconstructedURL = url.map(decodeURIComponent).join("/");

  const sessionId = (reconstructedURL + "__" + sessionCookie).replace(
    /\//g,
    ""
  );

  return <ChatWrapper sessionId={sessionId} />;
}
