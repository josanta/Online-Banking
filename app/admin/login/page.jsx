"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [password, setPasswd] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !name) {
      alert("Please fill in all fields");
      return;
    }
    const res = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        name
      })
  
  });
  if (!res.ok) {
    const res_str = "Wrong username or password!"
    alert(res_str)
    return;
  };
  // console.log("server says"+ res.json())
  Cookies.set('admin-authenticated', 'true');
  router.push('/admin/users');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onChange={(e) => setPasswd(e.target.value)}
              value={password}
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

export default AdminLogin;
