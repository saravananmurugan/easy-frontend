"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


const Tick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-3 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const XMark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-3 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const requirements = [
    { text: "Minimum length of 8 characters", valid: password.length >= 8 },
    { text: "Contains at least 1 letter", valid: /[a-zA-Z]/.test(password) },
    { text: "Contains at least 1 number", valid: /\d/.test(password) },
    { text: "Contains at least 1 special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  useEffect(() => {
    if (error){
      setError("");
    }
  },[email, error]);

  const allValid = requirements.every((req) => req.valid);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("access_token", data.data.access_token, { expires: 1, path: "/" });
        window.location.href = "/home"; // Redirect after successful registration
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
            Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={register} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="form-input"
                />
              </div>
              {isFocused && (
                <div className="absolute top-4 -left-1 -translate-x-full mt-2 w-auto rounded-md bg-white shadow-lg border border-gray-300 p-3 z-10">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Password Requirements:
                  </p>
                  <ul className="list-disc pl-0 space-y-1">
                    {requirements.map((req, index) => (
                      <li
                        key={index}
                        className={`flex items-center text-xs ${
                          req.valid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {req.valid ? Tick : XMark}
                        {req.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!allValid}
              >
                Create account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
