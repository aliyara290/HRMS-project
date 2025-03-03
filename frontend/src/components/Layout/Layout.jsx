import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full grid grid-cols-12">
      <div className="w-full grid col-span-2">
        <Sidebar />
      </div>
      <main className="relative col-span-10 w-full">
        <Header />
        <div className="relative flex flex-col gap-5 p-6 pt-22">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
