"use client";
import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const TblBodyComponent = (props) => {
  var user = props.user;
  const [UserPass, setUserPass] = useState("*******");
  const [showIcon, setShowIcon] = useState(IoEye);
  const [showPassword, setShowPassword] = useState(false);
  const date = new Date(user.createdAt);

  // Format the date and time
  const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
  const formattedTime = date.toLocaleTimeString();
  var joined_date = `${formattedDate} : ${formattedTime}`;
  const viewUserPass = () => {
    setShowPassword(!showPassword);
    setUserPass(showPassword ? user.UserPassword: "*******");
    setShowIcon(showPassword ? IoEye : IoMdEyeOff);
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{user.FirstName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.LastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.AccountNO}</td>
      <td className="flex px-6 py-4 whitespace-nowrap">
        <span className="mr-2 hover:cursor-pointer" onClick={viewUserPass}>
          {showIcon}
        </span>
        {UserPass}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{user.Balance}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.ServiceCharge}</td>
      <td className="px-6 py-4 whitespace-nowrap">{joined_date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={user.Active} hidden
        />
      </td>
    </tr>
  );
};

export default TblBodyComponent;
