"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verifyemail", {token})
          setVerified(true)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };
    useEffect(() => {
      if (token.length > 0) verifyUserEmail();
    }, [token])
    
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])
  
  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl">Verify Your Email</h1>
          <h2 className="p-2 bg-white text-black rounded">
              {token ? token : "no token"}
          </h2>
          {verified && (
              <div>
                  <h2 className="p-2 bg-white text-black rounded">
                      Email Verified
                  </h2>
                  <Link href={"/login"} className="text-white underline">
                      Login
                  </Link>
              </div>
          )}
          {error && (
              <div>
                  <h2 className="p-2 bg-red-500 text-white rounded text-xl">Error</h2>
              </div>
          )}
      </div>
  );
}
