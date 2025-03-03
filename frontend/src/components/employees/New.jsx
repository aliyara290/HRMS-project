import React, { useEffect, useState } from "react";
import { storeEmployee } from "../../api/employees";
import { getJobs } from "../../api/jobs";
import { getDepartments } from "../../api/departments";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setIsLoading] = useState(true);
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
    getJobs()
      .then((response) => {
        setJobs(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    getDepartments()
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const employeeData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      jobId: data.jobId,
      departmentId: data.departmentId,
      contractType: data.contractType,
      contractStartDate: data.contractStartDate,
      contractEndDate: data.contractEndDate,
      salary: data.salary,
    };
    storeEmployee(employeeData)
      .then((response) => {
        toast.success(`${data.name} created successfully!`);
        navigate("/employees/list");

        setData({
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
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create employee. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="p-3">
      {loading ? (
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
          <h2 className="text-white text-3xl font-bold">Add a new employeer</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-10">
            <div className="">
              <h3 className="text-white text-xl font-bold">
                Personal Information
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="f_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="First Name"
                  required=""
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price"
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
                  required=""
                  value={data.email}
                  onChange={handleChange}
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
                  required=""
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="birth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date of birth"
                  required=""
                  value={data.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date of birth"
                  required=""
                  value={data.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-white text-xl font-bold">
                {" "}
                Employment Details
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <label
                  htmlFor="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Title
                </label>
                <select
                  id="job_title"
                  name="jobId"
                  value={data.jobId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select job
                  </option>
                  {jobs.map((job) => (
                    <option value={job.id} key={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="departmentId"
                  value={data.departmentId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select department
                  </option>
                  {departments.map((dep) => (
                    <option value={dep.id} key={dep.id}>
                      {dep.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contract_type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract type
                </label>
                <select
                  id="contract_type"
                  name="contractType"
                  value={data.contractType}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected disabled>
                    Select type
                  </option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="contract_start_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract start date
                </label>
                <input
                  type="date"
                  name="contractStartDate"
                  id="contract_start_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={data.contractStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="contract_end_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract end date
                </label>
                <input
                  type="date"
                  name="contractEndDate"
                  id="contract_end_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required=""
                  value={data.contractEndDate}
                  onChange={handleChange}
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
                  type="number"
                  name="salary"
                  id="salary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Salary"
                  required=""
                  value={data.salary}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end sticky bottom-0 left-0 py-6 bg-[#171f2f] ">
            <button
              type="submit"
              className=" items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-blue-900 rounded-lg  hover:bg-blue-800 cursor-pointer"
            >
              Add emplooyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployeeForm;
