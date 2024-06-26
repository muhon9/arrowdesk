"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Failed to login", error);
      setError(error.response.data.message);
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      {loading && <Loading />}
      {!user && (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <div className="bg-white p-8 rounded-lg shadow-md w-80">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="border p-2 w-full rounded-md"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border p-2 w-full rounded-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="mb-6">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-gray-600">
              Remember me
            </label>
          </div> */}
              {error && <p className="text-red-600 font-sans mb-2">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
