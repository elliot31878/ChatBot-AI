import { cookies } from "next/headers";
import ChatWrapperClient from "@/components/Wrapper/ChatWrapperClient"; // Import the client-side component

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

  return <ChatWrapperClient sessionId={sessionId} />;
}
