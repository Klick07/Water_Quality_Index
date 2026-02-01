import { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/gov";

async function login(username, password) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.log("Login failed");
    return false;
  }

  console.log("Login successful");
  const refreshTokenValue = data.refreshToken || null;

  return true;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "1000px", position: "relative" }}>
      <div
        className="absolute inset-0 top-0 isolate"
        style={{ zIndex: 1, position: "relative" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Welcome Back!
          </h2>
          <p className="mt-2 text-lg/8 text-gray-400">
            Please enter your credentials to access your dashboard.
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-semibold text-white"
              >
                Username
              </label>
              <div className="mt-2.5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-semibold text-white"
              >
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                if (await login(username, password)) {
                  setUser(username);
                  setIsAuthenticated(true);
                  navigate(`/govdashboard/${username}`);
                }
              }}
              className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
