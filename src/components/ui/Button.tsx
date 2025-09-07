import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  ({ className, variant = "default", asChild, ...props }, ref) => {
    if (asChild) {
      // Render as anchor
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-paper dark:focus:ring-night",
            variant === "outline" && "border border-neutral-300 dark:border-neutral-700 bg-transparent",
            variant === "ghost" && "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
            variant === "default" && "bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-200",
            className
          )}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }
    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-paper dark:focus:ring-night",
          variant === "outline" && "border border-neutral-300 dark:border-neutral-700 bg-transparent",
          variant === "ghost" && "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
          variant === "default" && "bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-200",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
