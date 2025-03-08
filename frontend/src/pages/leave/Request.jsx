import React, { useState } from "react";
import { toast } from "react-toastify";
import { storeLeave } from "../../api/leave";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import useAuthContext from "../../context/AuthContext";

const LeaveRecoveryForm = () => {
  const {user} = useAuthContext();
  const [formData, setFormData] = useState({
    userId: "",
    leaveType: null,
    startDate: "",
    endDate: "",
    returnDate: "",
    totalDays: "",
    reason: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (formData.startDate && formData.endDate) {
      const startDateFormatted = new Date(formData.startDate).toISOString().split("T")[0];
      const endDateFormatted = new Date(formData.endDate).toISOString().split("T")[0];
      const returnDateFormatted = new Date(formData.endDate.getTime() + 86400000).toISOString().split("T")[0];
      const diffTime = Math.abs(new Date(endDateFormatted) - new Date(startDateFormatted));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const newFormData = {
        ...formData,
        userId: user.id,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        returnDate: returnDateFormatted,
        totalDays: diffDays.toString(),
      };
      storeLeave(newFormData)
        .then((response) => {
          setFormData({
            userId: user.id,
            leaveType: null,
            startDate: "",
            endDate: "",
            returnDate: "",
            totalDays: "",
            reason: "",
          });
          toast.success(response.data.response);
          navigate("/leaves/list");
        })
        .catch((e) => {
          console.log(e);
          
          setErrors(e.response?.data?.errors || []);
          toast.error(e.response.data.response);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("Start date and end date are required!");
    }
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
              >
                <option selected disabled>
                  Select type
                </option>
                {leaveTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.leaveType && (
                <span className="text-red-500 text-xs font-medium">
                  {errors.leaveType}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date
              </label>
              <Flatpickr
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                value={formData.startDate}
                onChange={(date) => handleDateChange(date, "startDate")}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  defaultDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }}
                placeholder="Select date"
              />
              {errors.startDate && (
                <span className="text-red-500 text-xs font-medium">
                  {errors.startDate}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date
              </label>
              <Flatpickr
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                value={formData.endDate}
                onChange={(date) => handleDateChange(date, "endDate")}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: formData.startDate
                    ? new Date(formData.startDate)
                    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }}
                placeholder="Select date"
              />
              {errors.endDate && (
                <span className="text-red-500 text-xs font-medium">
                  {errors.endDate}
                </span>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                readOnly
              />
            </div> */}
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
            ></textarea>
            {errors.reason && (
              <span className="text-red-500 text-xs font-medium">
                {errors.reason}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() =>
              setFormData({
                userId: user.id,
                leaveType: null,
                startDate: "",
                endDate: "",
                returnDate: "",
                totalDays: "",
                reason: "",
              })
            }
            className="px-6 py-2 mr-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-[170px] flex justify-center items-center bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-white animate-spin fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRecoveryForm;
