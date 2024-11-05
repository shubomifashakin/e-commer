import { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { loginFunction } from "../lib/data-service";

import { InputGroup } from "../components/InputGroup";
import Button from "../components/Button";
import { flushSync } from "react-dom";

export default function Page() {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginFunction,

    onSuccess: () => {
      if (redirectUrl) {
        document.startViewTransition(() => {
          flushSync(() => {
            navigate(`/${redirectUrl}`);
          });
        });
      } else {
        document.startViewTransition(() => {
          flushSync(() => {
            navigate("/catalog");
          });
        });
      }
    },

    onError: (error) => {
      //toast the error
      console.log(error.message);
    },
  });

  //submit function
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) return;

    mutate({ email, password });
  }

  return (
    <div className="h-dvh bg-primary flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-secondary border  w-1/2 px-4 py-6 rounded-sm"
      >
        <InputGroup
          label="Email"
          name="email"
          inputType="email"
          placeholder="Please enter your email"
        />

        <InputGroup
          label="Password"
          name="password"
          inputType="password"
          placeholder="Please enter your password"
        />

        <Button disabled={isPending} type={"submit"}>
          {isPending ? "Logging In" : "Log In"}
        </Button>
      </form>
    </div>
  );
}
