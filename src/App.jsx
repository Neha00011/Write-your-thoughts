import "./App.css";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-semibold text-gray-400">Loading...</p>
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-grow min-h-screen p-6">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
