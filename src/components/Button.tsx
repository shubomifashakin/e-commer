import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  type = "button",
  onClickFn,
  children,
  disabled = false,
  size = "lg",
  title,
}: ButtonTypes) {
  return (
    <button
      title={title}
      type={type}
      disabled={disabled}
      className={`text-xs p-2 disabled:cursor-wait disabled:bg-white disabled:text-black hover:bg-white hover:text-black font-semibold transition-all duration-500 ${
        size === "sm" && "w-fit"
      } ${size === "md" && "w-1/2"} ${
        size === "lg" && "w-full"
      } border rounded-sm `}
      onClick={onClickFn}
    >
      {children}
    </button>
  );
}

interface ButtonTypes {
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  onClickFn?: MouseEventHandler;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  title?: string;
}
