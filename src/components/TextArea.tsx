import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { mergeRefs } from "@/utils/mergeRefs";

const textareaClassName =
  "peer flex size-full resize-none grow appearance-none border-none bg-white outline-none disabled:cursor-not-allowed";

const textareaWrapperClassName =
  "relative h-24 min-h-12 mb-5 border rounded-xl bg-white flex items-start justify-between border-solid cursor-text aria-disabled:cursor-not-allowed";

const textareaVariants = cva(textareaWrapperClassName, {
  variants: {
    size: {
      sm: "min-h-9 px-3 py-[10px] text-xs",
      md: "min-h-10 px-3 py-[10px] text-xs",
      lg: "min-h-12 p-3 text-sm",
      xl: "min-h-14 px-3 py-4 text-sm",
    },
    color: {
      error: "border-error fill-success text-error",
      success: "border-success fill-success text-success",
      gray: "border-gray-200 fill-gray-500 text-gray-500 focus-within:border-foreground focus-within:fill-foreground focus-within:text-foreground",
    },
    disabled: {
      true: "fill-gray-300 text-gray-300",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    size: "lg",
    color: "gray",
  },
});

export interface TextareaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "color" | "disabled"
    >,
    VariantProps<typeof textareaVariants> {
  label?: string;
  message?: string;
  noMessage?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size,
      label,
      color,
      message,
      fullWidth,
      className,
      noMessage,
      placeholder,
      spellCheck = false,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLInputElement>(null);
    const mergedRefs = React.useMemo(() => mergeRefs(ref, textareaRef), [ref]);

    return (
      <div
        aria-disabled={!!props.disabled}
        onClick={() => textareaRef.current?.focus()}
        className={cn(
          textareaVariants({
            size,
            color,
            fullWidth,
            disabled: !!props.disabled,
          }),
          { "mb-0": noMessage },
          className
        )}
      >
        <textarea
          ref={mergedRefs}
          spellCheck={spellCheck}
          contentEditable={false}
          className={cn(textareaClassName, {
            "text-gray-300 placeholder:text-gray-300": props.disabled,
            "text-foreground placeholder:!text-gray-500": !props.disabled,
          })}
          {...props}
          disabled={!!props.disabled}
          placeholder={!!label ? " " : placeholder}
        />
        {!!label && (
          <span
            className={cn(
              "pointer-events-none absolute origin-top-right bg-inherit px-2 transition-[transform,colors] duration-300 scale-75 transform-gpu peer-placeholder-shown:bg-transparent peer-placeholder-shown:translate-x-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:bg-inherit peer-focus:translate-x-0 peer-focus:scale-75",
              {
                sm: "translate-y-[calc(-100%-0.1rem)] peer-focus:translate-y-[calc(-100%-0.1rem)]",
                md: "translate-y-[calc(-100%-0.1rem)] peer-focus:translate-y-[calc(-100%-0.1rem)]",
                lg: "translate-y-[calc(-100%-0.2rem)] peer-focus:translate-y-[calc(-100%-0.2rem)]",
                xl: "translate-y-[calc(-100%-0.375rem)] peer-focus:translate-y-[calc(-100%-0.375rem)]",
              }[size || "lg"]
            )}
          >
            {label}
          </span>
        )}
        {!noMessage && (
          <p className="absolute top-[calc(100%+.25rem)] text-2xs">{message}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
