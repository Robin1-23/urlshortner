



import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Toaster, toast } from "react-hot-toast";

const DEMO_EMAIL = "intern@dacoid.com";
const DEMO_PASSWORD = "Test12345";

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);

  useEffect(() => {
    const autoCreateDemoUser = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      const userExists = data?.users.find(user => user.email === DEMO_EMAIL);

      if (!userExists) {
        await supabase.auth.signUp({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });
      }
    };
    autoCreateDemoUser();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Successfully signed in!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign in to URL Shortener</h2>
        <p className="text-sm text-center text-gray-500 mt-1">Demo credentials are pre-filled</p>

        <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-10 10h4z" />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
