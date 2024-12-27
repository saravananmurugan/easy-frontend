"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Cookies from "js-cookie"; // For handling cookies

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded.username); 
      setLoading(false);
    } else {
      router.push("/signin");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/signin");
  };

  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user ? user : "Guest"}!
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  );
}
