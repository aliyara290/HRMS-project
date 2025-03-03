import React, { useEffect, useState } from "react";
import { getEmployee, updateEmployee } from "../../api/employees";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs } from "../../api/jobs";
import { getDepartments } from "../../api/departments";
import { toast } from "react-toastify";


const EmployeeFormUpdate = () => {
  const [employee, setEmployee] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    jobId: null,
    departmentId: null,
    contractType: null,
    contractStartDate: "",
    contractEndDate: "",
    salary: "",
  });

  useEffect(() => {
    if (!id) return;

    getEmployee(id)
      .then((response) => {
        setEmployee(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        setIsLoading(false);
      });

    getJobs()
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

    getDepartments()
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    updateEmployee(id, data)
      .then((response) => {
        toast.success(`${data.name} updated successfully!`);
        navigate("/employees/list");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        toast.error(`Failed to update ${data.name}. Please try again.`);

      }).finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <section className="p-3 pb-0">
      {isLoading ? (
        <div className="absolute bg-gray-900 opacity-60 top-0 left-0 w-full h-full flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        </div>
      ) : null}
      <div className="">
        <div className="mb-10 flex justify-center">
          <h2 className="text-white text-3xl font-bold">
            Update Employee
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-10">
            <div className="">
              <h3 className="text-white text-xl font-bold">
                Personal Information
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name"
                  required
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                  required
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone"
                  required
                  value={data.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={data.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address"
                  required
                  value={data.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-white text-xl font-bold">
                Employment Details
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  htmlFor="jobId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Title ( Current : {data.jobTitle} )
                </label>
                <select
                  id="jobId"
                  name="jobId"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.jobId}
                  onChange={handleInputChange}
                >
                  <option value="">Select job</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="departmentId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department ( Current : {data.name} )
                </label>
                <select
                  id="departmentId"
                  name="departmentId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.departmentId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contractType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract type ( Current : {data.contractType} )
                </label>
                <select
                  id="contractType"
                  name="contractType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.contractType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="CDD">CDD</option>
                  <option value="CDI">CDI</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="contractStartDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract start date
                </label>
                <input
                  type="date"
                  name="contractStartDate"
                  id="contractStartDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={data.contractStartDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="contractEndDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract end date
                </label>
                <input
                  type="date"
                  name="contractEndDate"
                  id="contractEndDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={data.contractEndDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="salary"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Salary"
                  required
                  value={data.salary}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end sticky bottom-0 left-0 py-6 bg-[#171f2f]">
            <button
              type="submit"
              className="items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-900 rounded-lg hover:bg-green-800 cursor-pointer"
            >
              Update employee
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployeeFormUpdate;