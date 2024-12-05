"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";

const UserLogin = () => {
  const [AccountNO, setAccountNO] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!AccountNO || !UserPassword) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("https://online-banking-w38v.onrender.com/api/users/login", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccountNO,
          UserPassword,
        }),
      });
      if (!res.ok) {
        const res_str = "Wrong account number or password!";
        alert(res_str);
        return;
      }
      const user = await res.json();
      // Cookies.set('authenticated', true);
      Cookies.set("authenticated", "true", { expires: 7, path: "/" });
      router.push("/" + user.user._id);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md">
        <div className="flex justify-center text-blue-600 logo mb-4 text-3xl">
          Central Pacific Bank
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setAccountNO(e.target.value)}
              value={AccountNO}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={UserPassword}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
