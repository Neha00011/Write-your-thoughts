import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="px-5 py-2 ml-4 text-white font-medium bg-red-500 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
