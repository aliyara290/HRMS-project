import React, { useState } from "react";
import { toast } from "react-toastify";

const LeaveRecoveryForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    leaveType: "annual",
    startDate: "",
    endDate: "",
    returnDate: "",
    reason: "",
    managerApproval: false,
    hrApproval: false,
  });

  const leaveTypes = [
    { value: "annual", label: "Annual Leave" },
    { value: "sick", label: "Sick Leave" },
    { value: "personal", label: "Personal Leave" },
    { value: "recovery", label: "Recovery Days" },
    { value: "bereavement", label: "Bereavement" },
    { value: "parental", label: "Parental Leave" },
    { value: "unpaid", label: "Unpaid Leave" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  //   const calculateDays = () => {
  //     if (formData.startDate && formData.endDate) {
  //       const start = new Date(formData.startDate);
  //       const end = new Date(formData.endDate);
  //       const diffTime = Math.abs(end - start);
  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  //       setFormData({
  //         ...formData,
  //         totalDays: diffDays.toString(),
  //         returnDate: new Date(end.getTime() + 86400000)
  //           .toISOString()
  //           .split("T")[0],
  //       });
  //     }
  //   };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Leave request submitted successfully!");
  };

  return (
    <div className=" w-full text-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-100">
          Leave & Recovery Request
        </h1>
        <p className="text-gray-400">
          Submit your leave or recovery days request for approval
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Employee Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                required
              />
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                required
              >
                {leaveTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Reason for Leave
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() =>
              setFormData({
                employeeId: "",
                employeeName: "",
                leaveType: "annual",
                startDate: "",
                endDate: "",
                returnDate: "",
                reason: "",
                managerApproval: false,
                hrApproval: false,
                status: "pending",
              })
            }
            className="px-6 py-2 mr-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRecoveryForm;
