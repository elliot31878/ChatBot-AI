import { ElementRef, forwardRef, ReactNode, useMemo, useRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { mergeRefs } from "@/utils/mergeRefs";
import { cn } from "@/utils/cn";
import { Square } from "lucide-react";
import { RippleEffect } from "./Ripple";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-normal outline-none transition-colors *:shrink-0 disabled:cursor-not-allowed",
  {
    variants: {
      color: {
        primary:
          "bg-primary text-primary hover:bg-primary-150 data-[variant=tonal]:bg-primary-50 data-[variant=filled]:hover:bg-primary-600 data-[variant=tonal]:hover:bg-primary-150",
        foreground:
          "bg-foreground text-foreground hover:bg-gray-150 data-[variant=tonal]:bg-gray-100 data-[variant=filled]:hover:bg-gray-600 data-[variant=tonal]:hover:bg-gray-150",
        gray: "bg-gray text-gray hover:bg-gray-150 data-[variant=tonal]:bg-gray-100 data-[variant=filled]:hover:bg-gray-800 data-[variant=tonal]:hover:bg-gray-150",
        success:
          "bg-success text-success hover:bg-success-150 data-[variant=tonal]:bg-success-50 data-[variant=filled]:hover:bg-success-600 data-[variant=tonal]:hover:bg-success-150",
        warning:
          "bg-warning text-warning hover:bg-warning-150 data-[variant=tonal]:bg-warning-50 data-[variant=filled]:hover:bg-warning-500 data-[variant=tonal]:hover:bg-warning-150",
        error:
          "bg-error text-error hover:bg-error-150 data-[variant=tonal]:bg-error-50 data-[variant=filled]:hover:bg-error-600 data-[variant=tonal]:hover:bg-error-150",
      },
      variant: {
        filled:
          "fill-white text-white  disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:!bg-gray-100 hover:disabled:!text-gray-400",
        outline:
          "border border-solid bg-white disabled:border-gray-300 disabled:text-gray-300 disabled:hover:!border-gray-300 disabled:hover:!text-gray-300",
        tonal:
          "disabled:!bg-gray-50 disabled:text-gray-400 disabled:hover:!bg-gray-50 disabled:hover:!text-gray-400",
        text: "bg-transparent disabled:text-gray-400 disabled:hover:!bg-transparent disabled:hover:!text-gray-400",
      },
      size: {
        xs: "h-6 min-w-1 px-2 py-[5px] text-2xs",
        sm: "h-8 min-w-1 px-[10px] py-2 text-xs",
        md: "h-10 min-w-1 p-3 text-xs",
        lg: "h-12 min-w-1 px-4 py-3 text-sm",
        xl: "h-14 min-w-1 px-5 py-4 text-base",
        "icon-xs": "size-6",
        "icon-sm": "size-8",
        icon: "size-10",
        "icon-lg": "size-12",
        "icon-xl": "size-14",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
      ripple: {
        true: "relative",
      },
    },
    defaultVariants: {
      size: "xl",
      rounded: "xl",
      variant: "filled",
      color: "primary",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  ripple?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      rounded,
      children,
      isLoading,
      className,
      fullWidth,
      ripple = true,
      asChild = false,
      variant = "filled",
      color = "primary",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const buttonRef = useRef<ElementRef<"button">>(null);

    const mergedRef = useMemo(() => mergeRefs(ref, buttonRef), [ref]);

    return (
      <Comp
        ref={mergedRef}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            rounded,
            fullWidth,
            ripple,
          }),
          className
        )}
        data-variant={variant}
        {...props}
      >
        {!!ripple && (
          <RippleEffect
            color={color}
            containerRef={buttonRef}
            mode={variant === "filled" ? "dark" : "light"}
          />
        )}
        {isLoading ? (
          <Square data-testid="loading-icon" className="mx-auto size-5" />
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
