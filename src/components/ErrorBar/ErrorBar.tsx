import { cn } from "@/utils/cn";
import { useState, useEffect } from "react";
import { TError } from "../Wrapper/ChatWrapper";
import { CloseIcon } from "@/common/icons/CloseIcon";
import { Button } from "../Button";

const ErrorBar = ({ error }: { error: TError }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 500);
    }
  }, [error]);

  return (
    <main className="z-9 fixed bottom-48 left-0 w-full flex justify-center">
      <section
        className={cn(
          "w-full h-20 bg-red-600 rounded-t-2xl px-4 pb-4 max-w-[48rem] transition-all duration-500 ease-out flex gap-2 justify-center items-center",
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <h3 className="font-bold text-lg">{error?.name}:</h3>
        <strong>
          {error?.message && error?.message?.trim() !== ""
            ? error?.message
            : "This error is due to a rate limit. Please try again tomorrow. Thanks!"}
        </strong>
        <Button
          variant={"text"}
          onClick={() => {
            setVisible(false);
          }}
          className="absolute right-1 top-1 cursor-pointer  rounded-full size-10"
        >
          <CloseIcon className="size-5 fill-white" />
        </Button>
      </section>
    </main>
  );
};

export default ErrorBar;
