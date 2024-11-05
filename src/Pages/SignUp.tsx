import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { InputGroup } from "../components/InputGroup";

import { signUpFunction } from "../lib/data-service";
import Button from "../components/Button";
import { flushSync } from "react-dom";

export default function Page() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signUpFunction,

    onSuccess: () => {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate("/catalog");
        });
      });
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
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const password = formData.get("password") as string | null;
    const verifyPassword = formData.get("verifyPassword") as string | null;

    if (!email || !password || !verifyPassword || !lastName || !firstName)
      return;

    mutate({ email, firstName, lastName, password, verifyPassword });
  }

  return (
    <div className="h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-secondary  p-5 rounded-sm"
      >
        <div className="flex gap-x-5">
          <InputGroup
            label="First Name"
            name="firstName"
            inputType="text"
            placeholder="Please enter your first name"
          />

          <InputGroup
            label="Last Name"
            name="lastName"
            inputType="text"
            placeholder="Please enter your last name"
          />
        </div>

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

        <InputGroup
          label="Re-enter Password"
          name="verifyPassword"
          inputType="password"
          placeholder="Please enter your password again"
        />

        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
