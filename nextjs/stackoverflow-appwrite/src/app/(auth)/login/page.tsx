"use client"
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

function LoginPage() {
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // collect data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

      // validation
      
        // Ensure all values are strings
        if (
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            setError("Invalid form data");
            return;
        }

        // Ensure fields are not empty
        if (
            !email.trim() ||
            !password.trim()
        ) {
            setError("Please fill out all the fields");
            return;
      }
      
      // handle loading and error
      setIsLoading(true)
      setError("")

        // login => store
      try {
          const loginResponse = await login(email, password)
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Something went wrong",
            );
        } finally {
            setIsLoading(false);
        }
    };
    return <div>LoginPage</div>;
}

export default LoginPage;
