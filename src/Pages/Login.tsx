import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { InputGroup } from "../components/InputGroup";

const details = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Page() {
  const navigate = useNavigate();

  //submit function
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const validatedData = details.parse({ email, password });

      //try submitting the data
      const req = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(validatedData),
      });

      if (!req.ok) {
        throw new Error(`An Error occurred ${req.statusText}`);
      }

      //go to redirect page if any
      //if not, go to catalog page
      navigate("/catalog");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.log("Validation errors:", error.errors);
      }

      //handle server errors, like wrong passwords/email && timeouts
      console.log(error);
    }
  }

  return (
    <div className="h-dvh bg-primary flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary  w-1/2 p-2 rounded-md"
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
