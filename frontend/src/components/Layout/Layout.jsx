import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import EmployeeForm from "../employees/Create";

const Layout = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-12 ">
      <div className="w-full grid col-span-2">
        <Sidebar />
      </div>
      <main className="col-span-10">
        <Header />
        <div className="flex flex-col gap-5 p-6">
          <EmployeeForm/>
        {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
