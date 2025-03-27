import { cn } from "@/utils/cn";
import { Bot, User } from "lucide-react";

interface IMessageBoxProps {
  content: string;
  isUserMessage: boolean;
}

export function MessageBox({ content, isUserMessage }: IMessageBoxProps) {
  return (
    <section
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <article className="p-6">
        <figure className="max-w-3xl mx-auto flex items-start gap-2.5">
          <figure
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </figure>
          <section className="flex flex-col ml-6 w-full">
            <figure className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Elliot"}
              </span>
            </figure>
            <span className="text-sm font-medium py-2.5 text-gray-900 dark:text-white">
              {content}
            </span>
          </section>
        </figure>
      </article>
    </section>
  );
}
