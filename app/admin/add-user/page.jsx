"use client";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import React, { useState, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const AddUser = () => {
  const [users, setUsers] = useState([])
  useLayoutEffect(() => {
    const isAuth = Cookies.get("admin-authenticated");
    if (!isAuth) {
      redirect("/admin/login");
    }
  }, []);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [AccountNO, setAccountNumber] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [ServiceCharge, setServiceCharge] = useState("");
  const [Balance, setBalance] = useState("");
  const [Status, setActive] = useState(false);
  const [profilePhoto, setProfilePicture] = useState("null");
  const router = useRouter();


  function setProfile(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    var imagebase = null;
    reader.onload = () => {
      imagebase = reader.result;
      // console.log(imagebase)
      setProfilePicture(imagebase);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }
  const submitUserData = async (e) => {
    e.preventDefault();
    if (
      !FirstName ||
      !LastName ||
      !AccountNO ||
      !Balance ||
      !UserPassword ||
      !ServiceCharge ||
      !profilePhoto
    ) {
      alert("All fields are required");
      return;
    }
    try {
      const res = await fetch("https://online-banking-w38v.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          FirstName,
          LastName,
          AccountNO,
          UserPassword,
          ServiceCharge,
          Balance,
          Status,
          profilePhoto
        }),
      });
      if (res.ok) {
        router.push("/admin/users");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <NavBar />
      <hr />
      <div className="flex justify-center items-center mt-4 bg-gray-800">
        <div className="bg-white w-96 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Add New User</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountNo"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Account Number
              </label>
              <input
                type="number"
                id="accountNo"
                name="accountNo"
                onChange={(e) => setAccountNumber(e.target.value)}
                value={AccountNO}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userPass"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                User Password
              </label>
              <input
                type="password"
                id="userPass"
                name="userPass"
                onChange={(e) => setUserPassword(e.target.value)}
                value={UserPassword}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceCharge"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Service Charge
              </label>
              <input
                type="number"
                id="serviceCharge"
                name="serviceCharge"
                onChange={(e) => setServiceCharge(e.target.value)}
                value={ServiceCharge}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="balance"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Balance
              </label>
              <input
                type="number"
                id="balance"
                name="balance"
                onChange={(e) => setBalance(e.target.value)}
                value={Balance}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="active"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Active
              </label>
              <select
                id="active"
                name="active"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setActive(e.target.value)}
                value={Status}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <div className="mb-4">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={submitUserData}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
