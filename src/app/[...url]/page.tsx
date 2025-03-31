import { useEffect, useState } from "react";
import { ChatWrapper } from "@/components/Wrapper/ChatWrapper";
import { cookies } from "next/headers";

export default function Page({
  params,
}: {
  params: Promise<{ url?: string[] }>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const fetchSessionId = async () => {
      const { url } = await params;
      if (!url) return;

      const sessionCookie = (await cookies()).get("session-id")?.value || "";
      const reconstructedURL = url.map(decodeURIComponent).join("/");
      const session = (reconstructedURL + "__" + sessionCookie).replace(
        /\//g,
        ""
      );
      setSessionId(session);
    };

    fetchSessionId();
  }, [params]);

  if (!isClient || !sessionId) return null;

  return <ChatWrapper sessionId={sessionId} />;
}
