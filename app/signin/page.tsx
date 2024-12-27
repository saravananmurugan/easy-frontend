"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export default function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error){
      setError("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[email]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("access_token", data.data.access_token, { expires: 1, path: "/" });
        window.location.href = "/home";
        setError("");
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message;
        setError(errorMessage);
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={login} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="form-label"
              >
                Email address
              </label>
              <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="form-input"
              />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-button"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="form-input"/>
              </div>
            </div>
            {/* Error Message Display */}
            {error && (
              <div className="text-red-600 text-sm m-0">
                <p>{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="form-button"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-button"
            >
              Create New Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
