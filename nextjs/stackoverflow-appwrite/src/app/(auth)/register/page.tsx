"use client"
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

function RegisterPage() {
    const { createAccount, login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");

        // Ensure all values are strings
        if (
            typeof firstname !== "string" ||
            typeof lastname !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            setError("Invalid form data");
            return;
        }

        // Ensure fields are not empty
        if (
            !firstname.trim() ||
            !lastname.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setError("Please fill out all the fields");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const response = await createAccount(
                `${firstname.trim()} ${lastname.trim()}`,
                email.trim(),
                password,
            );

            const loginResponse = await login(email, password);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Something went wrong",
            );
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}></form>
        </div>
    );
}

export default RegisterPage;
