import { type Message as TMessage } from "ai/react";
import { MessageBox } from "./component/MessageBox/MessageBox";
import { TStatus } from "../Wrapper/ChatWrapper";
interface IMessagesProps {
  messages: TMessage[];
  status: TStatus;
}

export function ChatMessages({ messages }: IMessagesProps) {
  return (
    <main className="flex max-h-[calc(100vh-13rem)] flex-1 flex-col overflow-y-auto">
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
