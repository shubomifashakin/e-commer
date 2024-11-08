import { FormEvent, ReactNode } from "react";

export default function Form({
  handleSubmit,
  children,
  width = "full",
}: {
  children: ReactNode;
  width?: "full" | "half";
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <div className={`h-dvh flex items-center justify-center`}>
      <form
        onSubmit={handleSubmit}
        className={`space-y-5  ${
          width === "half" && "w-1/2"
        }  border bg-secondary px-4 py-6 rounded-sm`}
      >
        {children}
      </form>
    </div>
  );
}
