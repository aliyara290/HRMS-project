import { useEffect } from "react";
import Layout from "./components/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import New from "./pages/employee/New.jsx";
import EmployeesList from "./pages/employee/List.jsx";
import DepartmentListPage from "./pages/department/List.jsx";
import Login from "./pages/auth/Login.jsx";
import EmployeeFormUpdate from "./components/employees/Update.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard.jsx";
import CareerPage from "./pages/career/index.jsx";
import LeaveRecoveryForm from "./pages/leave/index.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees/new" element={<New />} />
            <Route path="/employees/list" element={<EmployeesList />} />
            <Route
              path="/employees/update/:id"
              element={<EmployeeFormUpdate />}
            />
            <Route path="/career/:id" element={<CareerPage />} />
            <Route path="/leave" element={<LeaveRecoveryForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
