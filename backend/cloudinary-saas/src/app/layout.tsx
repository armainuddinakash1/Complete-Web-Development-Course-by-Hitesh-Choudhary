import {
    ClerkProvider,
    Show,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CloudeTube",
    description: "Authenticated Next.js app powered by Clerk",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            data-theme="night"
        >
            <body suppressHydrationWarning className="min-h-full flex flex-col">
                <ClerkProvider>
                    <Toaster />
                    <header className="border-b border-white/10 bg-base-200/80 px-6 py-4">
                        <div className="mx-auto flex max-w-6xl items-center justify-between">
                            <a
                                href="/"
                                className="text-lg font-semibold tracking-tight"
                            >
                                CloudeTube
                            </a>
                            <div className="flex items-center gap-3">
                                <Show when="signed-out">
                                    <SignInButton />
                                    <SignUpButton />
                                </Show>
                                <Show when="signed-in">
                                    <UserButton />
                                </Show>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1">{children}</main>
                </ClerkProvider>
            </body>
        </html>
    );
}
