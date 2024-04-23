"use client"
import TblBodyComponent from "@/components/tblBodyComponent";
import { useLayoutEffect, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";


export default function Users() {
  const [users, setUsers] = useState([])
  useLayoutEffect(() => {
    const isAuth = Cookies.get("admin-authenticated");
    if (!isAuth) {
      redirect("/admin/login");
    }
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          cache: "no-store",
        });
    
        if (!res.ok) {
          throw new Error("Failed getting users.");
        }
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.log("Error getting users", error);
      }
    };

    getUsers();
  }, []);
  // const users = users_.users;
  const handleLogout = () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      Cookies.remove("admin-authenticated");
      router.push("/admin/login");
    } else {
      return;
    }
  };
  return (
    <div className="overflow-x-auto mt-5">
      <div className="flex justify-between pr-6 mb-4">
        <h1 className="text-3xl ml-5">Users</h1>
        <div className="flex btns gap-1 items-start justify-center">
          <a
            href="/admin/add-user"
            className="rounded-md bg-green-700 hover:bg-green-400 text-white px-4 py-2 hover:font-bold hover:cursor-pointer"
          >
            Add User
          </a>
          <button
            onClick={handleLogout}
            className="rounded-md bg-green-300 hover:bg-green-400 text-white px-4 py-2 hover:font-bold hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Account Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User Password
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Balance
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Outstanding Service Charge
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Registration Date
            </th>
            <th
              hidden
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => {
            return <TblBodyComponent key={user._id} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
