import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { InputGroup } from "../components/InputGroup";

const details = z
  .object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, "at least 8 characters"),
    verifyPassword: z.string().min(8, "at least 8 characters"),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

export default function Page() {
  const navigate = useNavigate();

  //submit function
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const password = formData.get("password");
    const verifyPassword = formData.get("verifyPassword");

    try {
      //validate the data being sent
      details.parse({
        email,
        password,
        lastName,
        firstName,
        verifyPassword,
      });

      //try submitting the data
      const req = await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({ email, password, lastName, firstName }),
      });

      if (!req.ok) {
        throw new Error(`An Error occurred ${req.statusText}`);
      }

      //go to redirect page if a redirect was specified
      //if not, go to catalog page
      navigate("/catalog");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.log("Validation errors:", error.errors);
      }

      console.log(error);
    }
  }

  return (
    <div className="h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary   p-4 rounded-md"
      >
        <div className="flex gap-x-4">
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

        <button className="rounded-sm bg-" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
