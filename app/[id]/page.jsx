"use client";
import Image from "next/image";
import ItemComponent from "@/components/ItemComponent";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter, redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home({ params }) {
  useLayoutEffect(() => {
    const isAuth = Cookies.get("authenticated");
    if (!isAuth) {
      redirect("/login");
    }
  }, []);
  const [AccountNumber, setAccountNumber] = useState("");
  const [DepositAmount, setDepositAmount] = useState("");
  const [WithdrawAmount, setWithdrawAmount] = useState("");
  const [Balance, setBalance] = useState("0.00");
  const [showModal, setShowModal] = useState(false);
  const [serviceFee, setServiceFee] = useState("0.00");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const FullName = `${fname} ${lname}`.toUpperCase();
  const router = useRouter();
  var balance_str = "Ksh " + Number(Balance).toLocaleString();
  var service_str = "Ksh " + Number(serviceFee).toLocaleString();
  const { id } = params;
  // console.log("id" + id);
  const getUser = async () => {
    if (id) {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data_ = await res.json();
        const data = data_.user;
        // console.log(data);
        // Update state with user data
        setAccountNumber(data.AccountNO);
        setServiceFee(data.ServiceCharge);
        setBalance(data.Balance);
        setFname(data.FirstName);
        setLname(data.LastName);
      } catch (error) {
        console.error("Error:", error);
        // Handle error (e.g., display error message)
      }
    } else {
      console.log("id is undefined");
      // Handle case where id is undefined (optional)
    }
  };

  getUser();
  const handleDeposit = (e) => {
    if (DepositAmount < 100) {
      alert("Minimum amount to deposit is Ksh 100");
      setDepositAmount("");
    } else {
      setTimeout(() => setShowModal(true), 2000);
      setTimeout(() => setShowModal(false), 4000);
    }
  };

  const handleWithdraw = (e) => {
    if (WithdrawAmount > Balance) {
      alert("You cannot withdraw amount more than your balance of " + Balance);
      setWithdrawAmount("");
    } else if (WithdrawAmount < 100) {
      alert("Minimum amount to withdraw is Ksh 100");
      setWithdrawAmount("");
    } else {
      setTimeout(() => setShowModal(true), 2000);
      setTimeout(() => setShowModal(false), 4000);
    }
  };

  const handleLogout = () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      Cookies.remove("authenticated");
      router.push("/login");
    } else {
      return;
    }
  };
  return (
    <>
      <div className="header flex relative justify-end items-center bg-blue-500">
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:text-lg hover:font-bold text-white px-4 py-2 rounded-md mt-4"
        >
          Logout
        </button>
      </div>
      <div className="bg-gray-100 max-w-lg m-auto p-4 mt-6 pb-6">
        <div className="flex justify-center logo mb-4 text-3xl">
          <Image src="/logo.png" width={170} height={100} />
        </div>
        {showModal && (
          <div className="modal bg-red-300 p-6 mb-4">
            <div className="modal-content">
              <span
                className="close flex text-3xl text-red-600 font-extrabold justify-end"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <p>Please contact support for assistance.</p>
            </div>
          </div>
        )}
        <div className="info">
          <div className="flex welcome-user font-semibold text-3xl mb-2 justify-end">
            Welcome, {FullName}
          </div>
          <ItemComponent title="Account Number" value={AccountNumber} />
          <ItemComponent title="Balance" value={balance_str} />
          <ItemComponent
            title="Outstanding Service Charge"
            value={service_str}
          />
        </div>
        <hr className="h-1 text-black text-3xl shadow-md" />
        <div className="deposit pt-2 mb-10">
          <div className="font-bold text-2xl mt-2 mb-2">Deposit</div>
          <label class="flex justify-center items-center gap-4">
            <span class="block text-sm font-medium text-slate-700">
              Amount:
            </span>
            <input
              onChange={(e) => setDepositAmount(e.target.value)}
              type="number"
              value={DepositAmount}
              class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <button
            onClick={handleDeposit}
            class="bg-black hover:bg-slate-600 text-white px-2 py-1 rounded-md mt-4"
          >
            Deposit
          </button>
        </div>
        <hr className="h-1 text-black text-3xl shadow-md" />
        <div className="deposit pt-2">
          <div className="font-bold text-2xl mt-2">Withdraw</div>
          <label class="flex justify-center items-center gap-4">
            <span class="block text-sm font-medium text-slate-700">
              Amount:
            </span>
            <input
              onChange={(e) => setWithdrawAmount(e.target.value)}
              type="number"
              value={WithdrawAmount}
              class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <button
            onClick={handleWithdraw}
            class="bg-black hover:bg-slate-600 text-white px-2 py-1 rounded-md mt-4"
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}
