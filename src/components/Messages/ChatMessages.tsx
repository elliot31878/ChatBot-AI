import { type Message as TMessage } from "ai/react";
import { MessageBox } from "./component/MessageBox/MessageBox";
import { MessageSquare } from "lucide-react";

interface IMessagesProps {
  messages: TMessage[];
}

export function ChatMessages({ messages }: IMessagesProps) {
  return (
    <main className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
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
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-xl text-white">{`You're all set!`}</h3>
          <span>Ask your first question to get started.</span>
        </section>
      )}
    </main>
  );
}
