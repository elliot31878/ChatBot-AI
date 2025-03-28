import { type Message as TMessage } from "ai/react";
import { MessageBox } from "./component/MessageBox/MessageBox";
import { TStatus } from "../Wrapper/ChatWrapper";
import { useEffect, useRef } from "react";
interface IMessagesProps {
  messages: TMessage[];
  status: TStatus;
}

export function ChatMessages({ messages, status }: IMessagesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if ((status === "streaming" || status === "submitted") && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [status, messages]);
  return (
    <main
      ref={ref}
      className="flex max-h-[calc(100vh-13rem)] flex-1 flex-col overflow-y-auto"
    >
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <MessageBox
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <section className="flex-1 flex flex-col items-center justify-center gap-2">
          <h1 className="font-semibold text-3xl text-white">
            What Can I Help With?
          </h1>
        </section>
      )}
    </main>
  );
}
