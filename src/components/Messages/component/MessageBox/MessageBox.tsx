import { cn } from "@/utils/cn";
import { Bot, User } from "lucide-react";

interface IMessageBoxProps {
  content: string;
  isUserMessage: boolean;
}

export function MessageBox({ content, isUserMessage }: IMessageBoxProps) {
  return (
    <section className="p-2 w-full flex justify-center">
      <article
        className={cn("max-w-[50rem] w-full flex", {
          "justify-end": isUserMessage,
        })}
      >
        <figure
          className={cn(
            "flex items-start gap-2.5 p-4 rounded-2xl max-w-[75%]",
            {
              "bg-zinc-700 text-white ml-auto": isUserMessage,
              "bg-zinc-900/25 text-white": !isUserMessage,
            }
          )}
        >
          {!isUserMessage && (
            <figure className="size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center">
              <Bot className="size-5 text-white" />
            </figure>
          )}
          <section className="flex flex-col w-full">
            <figure className="flex items-center space-x-2">
              <span className="text-sm font-semibold">
                {isUserMessage ? "You" : "Elliot"}
              </span>
            </figure>
            <span className="text-sm font-medium py-2.5">{content}</span>
          </section>
          {isUserMessage && ( // Only show user icon for user messages
            <figure className="size-10 shrink-0 aspect-square rounded-full border border-blue-700 bg-blue-950 flex justify-center items-center text-zinc-200">
              <User className="size-5" />
            </figure>
          )}
        </figure>
      </article>
    </section>
  );
}
