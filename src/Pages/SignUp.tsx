import { FormEvent } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { InputGroup } from "../components/InputGroup";
import Button from "../components/Button";

import { signUpFunction } from "../lib/data-service";
import Form from "../components/Form";

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
      toast.error(error.message);
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
    <Form handleSubmit={handleSubmit}>
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
    </Form>
  );
}
