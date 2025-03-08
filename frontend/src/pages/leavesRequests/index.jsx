import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Search,
  Filter,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { getPendingLeaves } from "../../api/leave";

const HRLeaveApprovalDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionNote, setActionNote] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || request.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleApproveRequest = (id) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "accepted",
              notes: [
                ...request.notes,
                {
                  author: "HR Admin",
                  date: new Date().toISOString().split("T")[0],
                  text: actionNote || "Request accepted",
                },
              ],
            }
          : request
      )
    );
    setActionNote("");
    setSelectedRequest(null);
  };

  const handleRejectRequest = (id) => {
    if (!actionNote) {
      alert("Please provide a reason for rejection");
      return;
    }

    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "rejected",
              notes: [
                ...request.notes,
                {
                  author: "HR Admin",
                  date: new Date().toISOString().split("T")[0],
                  text: actionNote,
                },
              ],
            }
          : request
      )
    );
    setActionNote("");
    setSelectedRequest(null);
  };

  const getManagerApprovalBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <div className="flex items-center px-2 py-1 rounded-full bg-green-900 bg-opacity-30 text-green-400 text-xs">
            <Check size={12} className="mr-1" />
            Manager Approved
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center px-2 py-1 rounded-full bg-red-900 bg-opacity-30 text-red-400 text-xs">
            <X size={12} className="mr-1" />
            Manager Rejected
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center px-2 py-1 rounded-full bg-yellow-900 bg-opacity-30 text-yellow-400 text-xs">
            <Clock size={12} className="mr-1" />
            Manager Review
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getPendingLeaves()
      .then((response) => {
        setLeaveRequests(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="flex">
        <div className="w-full">
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Leave Request Approvals
              </h2>
              <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                <span className="font-medium">{filteredRequests.length}</span>{" "}
                pending requests
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by employee name or request ID..."
                    className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="inline-block relative">
                    <select
                      className="bg-gray-800 text-white appearance-none border border-gray-600 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className=" rounded-lg overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-950">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Employee
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Leave Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-600">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center">
                          <AlertCircle
                            size={40}
                            className="text-gray-500 mb-2"
                          />
                          <p className="text-gray-400">
                            No leave requests match your filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="hover:bg-gray-800 cursor-pointer"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full mr-3 bg-gray-700 flex justify-center items-center">
                              <span className="text-gray-950">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white hover:text-blue-500">
                                <Link to={`/career/${request.employee_id}`} >
                                {request.employeeName}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-400">
                                {request.position}
                              </div>
                              <div className="text-xs text-gray-500">
                                {request.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white capitalize">
                            {request.leaveType}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 mb-2">
                            {formatDate(request.startDate)} -{" "}
                            {formatDate(request.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">
                            {request.totalDays} days
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Balance: {request.balanceAfterRequest} remaining
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span
                              className={`inline-flex rounded-full h-2 w-2 mr-2 ${
                                request.status === "approved"
                                  ? "bg-green-500"
                                  : request.status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                              }`}
                            ></span>
                            <span className="text-sm text-white capitalize">
                              {request.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Submitted: {formatDate(request.submittedOn)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-center space-x-2">
                            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition">
                              Approve
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition">
                              Reject
                            </button> */}
                            <button className="text-gray-400 hover:text-white cursor-pointer">
                              <MoreHorizontal size={23} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedRequest && (
          <div className="fixed right-0 top-0 z-52 h-screen w-96 bg-gray-900 shadow-gray-950 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Request Details
                </h3>
                <button
                  className="cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => setSelectedRequest(null)}
                >
                  <X size={26} />
                </button>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full mr-3 bg-gray-700 flex justify-center items-center">
                    <span className="text-gray-950">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {selectedRequest.employeeName}
                    </div>
                    <div className="text-sm text-gray-400">
                      {selectedRequest.position}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedRequest.employeeId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                    Request Information
                  </h4>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      
                      <div>
                        <div className="text-xs text-gray-500">
                          Submitted On
                        </div>
                        <div className="text-sm text-white">
                          {formatDate(selectedRequest.submittedOn)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Leave Type</div>
                        <div className="text-sm text-white capitalize">
                          {selectedRequest.leaveType}
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                    Leave Period
                  </h4>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Start Date</div>
                        <div className="text-sm text-white">
                          {formatDate(selectedRequest.startDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">End Date</div>
                        <div className="text-sm text-white">
                          {formatDate(selectedRequest.endDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="text-sm text-white">
                          {selectedRequest.totalDays} days
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">
                          Leave Balance
                        </div>
                        <div className="text-sm text-white">
                          {selectedRequest.balanceBeforeRequest} →{" "}
                          {selectedRequest.balanceAfterRequest}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-gray-500">Reason</div>
                      <div className="text-sm text-white mt-1">
                        {selectedRequest.reason}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                    HR Action
                  </h4>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <label className="block text-xs text-gray-500 mb-1">
                      Note/Reason (Required for rejection)
                    </label>
                    <textarea
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      rows="3"
                      placeholder="Add optional note for approval or required reason for rejection..."
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                    ></textarea>

                    <div className="flex gap-3 mt-4">
                      <button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition"
                        onClick={() => handleApproveRequest(selectedRequest.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm transition"
                        onClick={() => handleRejectRequest(selectedRequest.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRLeaveApprovalDashboard;
