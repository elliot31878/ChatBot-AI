import Player from "@/common/lottie/Player";
import { cn } from "@/utils/cn";

interface IMessageBoxProps {
  content: string;
  isUserMessage: boolean;
  id: string;
}

export function MessageBox({ content, isUserMessage, id }: IMessageBoxProps) {
  const isWaiting = id === "WAITING";
  return (
    <section className="p-2 w-full flex justify-center">
      <article
        className={cn("max-w-[50rem] w-full flex gap-2 relative", {
          "justify-end": isUserMessage,
        })}
      >
        {!isUserMessage && (
          <figure
            className={cn(
              "size-10  absolute -left-4 -bottom-4 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              isWaiting && "!-bottom-16"
            )}
          >
            <Player
              lottie={isWaiting ? "robotLoading" : "bot"}
              loop
              autoplay
              className="size-[2rem]"
            />
          </figure>
        )}
        {!isWaiting && (
          <figure
            className={cn(
              "flex items-start gap-2.5 p-4 rounded-2xl max-w-[75%]",
              {
                "bg-zinc-700 text-white ml-auto": isUserMessage,
                "bg-zinc-900/25 text-white": !isUserMessage,
              }
            )}
          >
            <section className="flex flex-col w-full min-w-20">
              <figure className="flex items-center space-x-2">
                <span className="text-sm font-semibold">
                  {isUserMessage ? "You" : "Elliot"}
                </span>
              </figure>
              <span className="text-sm font-medium py-2.5">{content}</span>
            </section>
          </figure>
        )}
        {isUserMessage && (
          <figure className="size-10 shrink-0 aspect-square  -bottom-4 -right-4 absolute rounded-full border border-blue-700 bg-blue-950 flex justify-center items-center text-zinc-200">
            <Player lottie="user" loop autoplay className="size-[2rem]" />
          </figure>
        )}
      </article>
    </section>
  );
}
