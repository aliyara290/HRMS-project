import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";
import { getLeaves } from "../../api/leave";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LeaveRequestsDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <div className="flex items-center px-3 py-1 rounded-full bg-green-900 bg-opacity-30 text-green-400 text-sm">
            <Check size={14} className="mr-1" />
            Approved
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center px-3 py-1 rounded-full bg-red-900 bg-opacity-30 text-red-400 text-sm">
            <X size={14} className="mr-1" />
            Rejected
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center px-3 py-1 rounded-full bg-yellow-900 bg-opacity-30 text-yellow-400 text-sm">
            <Clock size={14} className="mr-1" />
            Pending
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
    getLeaves()
      .then((response) => {
        setLeaveRequests(response.data.data);
      })
      .catch((e) => {
        toast.info(e.response.data.errors);
      });
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              My Leave Requests
            </h1>
            <p className="text-gray-400">
              View and track the status of all your leave applications
            </p>
          </div>
          <Link to="/leaves/request">
            <button className="cursor-pointer mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center">
              <span className="mr-2">New Request</span>
              <Calendar size={18} />
            </button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by date or leave type"
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="inline-block relative">
                <select
                  className="cursor-pointer bg-gray-800 text-white appearance-none border border-gray-600 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Request Cards */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-gray-700 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle size={48} className="text-gray-500" />
              </div>
              <h3 className="text-xl text-gray-300 font-medium">
                No leave requests found
              </h3>
              <p className="text-gray-400 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition duration-300"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <span className="capitalize text-md font-medium">
                          Type: {request.leaveType}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Period</div>
                      <div className="text-white flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {formatDate(request.startDate)} -{" "}
                        {formatDate(request.endDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Duration</div>
                      <div className="text-white">
                        {request.totalDays}{" "}
                        {request.totalDays === 1 ? "day" : "days"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Reason</div>
                      <div className="text-white truncate max-w-xs">
                        {request.reason}
                      </div>
                    </div>
                  </div>

                  {request.status === "accepted" && (
                    <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Check size={16} className="mr-2 text-green-400" />
                        Accepted
                      </div>
                    </div>
                  )}

                  {request.status === "rejected" && (
                    <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                      <div className="flex items-center">
                        <X size={16} className="mr-2 text-red-400" />
                        Rejected
                      </div>
                      <div className="mt-1 text-red-300">
                        Reason: {request.rejectionReason}
                      </div>
                    </div>
                  )}

                  {request.status === "pending" && (
                    <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-yellow-400" />
                        Awaiting approval
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsDashboard;
