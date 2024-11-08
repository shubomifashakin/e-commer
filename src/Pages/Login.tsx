import { flushSync } from "react-dom";
import { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { loginFunction } from "../lib/data-service";

import { InputGroup } from "../components/InputGroup";
import Button from "../components/Button";

import toast from "react-hot-toast";
import Form from "../components/Form";

export default function Page() {
  const [searchParams] = useSearchParams();

  //gets the redirecturl if there is any
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
      toast.error(error.message);
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
    <Form handleSubmit={handleSubmit} width="half">
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
    </Form>
  );
}
