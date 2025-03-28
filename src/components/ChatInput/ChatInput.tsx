import { useChat } from "@ai-sdk/react";

import { ArrowDown } from "lucide-react";
import { Textarea } from "../TextArea";
import { Button } from "../Button";
import { TStatus } from "../Wrapper/ChatWrapper";

type THandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type THandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type TSetInput = ReturnType<typeof useChat>["setInput"];

interface IChatInputProps {
  input: string;
  handleInputChange: THandleInputChange;
  handleSubmit: THandleSubmit;
  setInput: TSetInput;
  status: TStatus;
}

export function ChatInput({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  status,
}: IChatInputProps) {
  return (
    <section className="z-10 absolute bottom-0 left-0 w-full flex justify-center ">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 w-full max-w-[50rem]">
        <figure className="relative flex h-full flex-1 items-stretch md:flex-col">
          <section className="relative flex flex-col w-full">
            <form
              data-testid="form-test-id"
              className="relative"
              onSubmit={handleSubmit}
            >
              <Textarea
                autoFocus
                data-testid="textarea-test-id"
                onChange={handleInputChange}
                value={input}
                style={{ background: "transparent" }}
                onKeyDown={(e) => {
                  if (status !== "submitted") {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                      setInput("");
                    }
                  }
                }}
                placeholder="Ask anything"
                className="resize-none min-h-40 rounded-3xl bg-zinc-700 border-none outline-none ring-0 text-2xl shadow-2xl"
              />
              <Button
                type="submit"
                data-testid="button-test-id"
                disabled={status === "submitted"}
                isLoading={status === "submitted"}
                className="absolute text-black z-10 border size-12 border-border bg-white right-2 bottom-8 rounded-full shadow-2xl shadow-amber-50 cursor-pointer"
              >
                <ArrowDown className="size-6 text-black rotate-180" />
              </Button>
            </form>
          </section>
        </figure>
      </div>
    </section>
  );
}
