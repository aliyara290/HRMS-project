import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCareer } from "../../api/career";
import { getEmployee } from "../../api/employees";
import { storeCareer } from "../../api/career";
import { toast } from "react-toastify";
// import gsap from "gsap";

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState({
    employeeId: id,
    departmentId: "",
    contractStartDate: "",
    contractEndDate: "",
    contractType: "",
    jobId: "",
    salary: "",
    status: "",
  });
  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    getCareer(id)
      .then((response) => {
        setCareers(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });

    getEmployee(id)
      .then((response) => {
        setEmployee(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // gsap.fromTo(
    //   ".careers_path",
    //   {
    //     opacity: 0,
    //     x: "-100%",
    //   },
    //   {
    //     opacity: 1,
    //     x: 0,
    //     stagger: 0.7,
    //     duration: 0.9,
    //   }
    // );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    storeCareer(data)
      .then((response) => {
        console.log(response);
        toast.success("Career added successfully!");
        getCareer(id)
          .then((response) => {
            setCareers(response.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setData({
          employeeId: id,
          departmentId: "",
          contractStartDate: "",
          contractEndDate: "",
          contractType: "",
          jobId: "",
          salary: "",
          status: "",
        });
        setIsClose(true);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleClick = () => {
    setIsClose(false);
  };
  const handleClose = () => {
    setIsClose(true);
  };
  return (
    <>
      {/* <div className="absolute  top-0 left-0 w-full h-full bg-gray-900 opacity-60 z-46"></div> */}
      <div
        className={`absolute w-full min-h-screen z-40 top-0 left-0 bg-[#101828ae] flex justify-center items-center ${
          isClose ? "hidden" : ""
        }`}
      >
        <div className="bg-gray-700 p-5 rounded-xl relative w-4xl">
          <div className="flex justify-center pb-6">
            <h3 className="text-white text-xl font-medium">Add new career</h3>
          </div>
          <div
            onClick={handleClose}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 text-white hover:text-blue-400"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className=" w-full ">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4 w-full">
                <input
                  type="hidden"
                  name="employeeId"
                  value={data.employeeId}
                />
                <div>
                  <label
                    htmlFor="departmentId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department name
                  </label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={data.departmentId}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected disabled>
                      Select Department
                    </option>
                    <option value="2">Ali</option>
                    <option value="1">Aymane</option>
                    <option value="4">Khalid</option>
                    <option value="6">Oumayma/Console</option>
                    <option value="8">Youness</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="jobId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Post title
                  </label>
                  <select
                    id="jobId"
                    name="jobId"
                    value={data.jobId}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected disabled>
                      Select post
                    </option>
                    <option value="2">Ali</option>
                    <option value="1">Aymane</option>
                    <option value="4">Khalid</option>
                    <option value="6">Oumayma/Console</option>
                    <option value="8">Youness</option>
                  </select>
                </div>
                <div className="">
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
                    value={data.contractStartDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                <div className="">
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
                    value={data.contractEndDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="contractType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contract type
                  </label>
                  <select
                    id="contractType"
                    name="contractType"
                    value={data.contractType}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected disabled>
                      Select Contract
                    </option>
                    <option selected="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected disabled>
                      Select Contract
                    </option>
                    <option selected="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="terminated">terminated</option>
                  </select>
                </div>
                <div className="">
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
                    value={data.salary}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center items-center w-[120px] py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 ${
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
                    "Add career"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <section className="mt-12 pt-24 relative flex flex-col gap-4 items-center justify-center bg-gray-800 w-full rounded-md shadow-2xl border border-1 border-gray-700 p-6">
        <div className="absolute left-3/6 -translate-x-3/6 -top-15 flex justify-center items-center w-32 h-32 rounded-full shadow-2xl bg-gray-900 border border-1 border-gray-800">
          <span className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-15"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="">
          <h1 className="text-3xl text-gray-300 font-medium">
            {employee.name}
          </h1>
        </div>
        <div className="w-3/6 text-center mt-7">
          <ul className="flex gap-6 items-center justify-center">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </span>
              <span>
                <a
                  className="text-blue-100 underline hover:text-blue-300"
                  href={`mailto:+${employee.email}`}
                >
                  {employee.email}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>
                <a
                  className="text-blue-100 hover:text-blue-300 underline"
                  href={`tel:+${employee.phone}`}
                >
                  {employee.phone}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="absolute top-5 right-5">
          <button
            onClick={handleClick}
            className="line-clamp-5 cursor-pointer hover:bg-blue-700 bg-blue-600 px-4 py-2 rounded-md text-white"
          >
            Add new career
          </button>
        </div>
      </section>
      <section className="flex justify-center p-6 bg-gray-800 rounded-md border border-1 border-gray-700">
        <div className="px-32 w-full overflow-x-auto">
          <ol className="flex items-center w-full  py-26">
            <li className="w-full min-w-[190px] flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
              <span className="relative flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full lg:h-8 lg:w-8 dark:bg-blue-800 shrink-0">
                <svg
                  className="w-2 h-2 text-blue-600 lg:w-3 lg:h-3 dark:text-gray-100"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <div className="absolute w-max -top-12 bg-blue-800 rounded-md px-4 py-1">
                  <span className="text-xs line-clamp-4 font-medium text-gray-100">
                    {employee.contractStartDate}
                  </span>
                </div>
                <div className="absolute w-max top-12 text-white flex flex-col items-center">
                  <span>{employee.jobTitle}</span>
                  <span>{employee.contractType}</span>
                </div>
              </span>
            </li>
            {careers.map((career, index) => (
              <li
                key={index}
                className="careers_path w-full min-w-[190px] flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
              >
                <div className="relative flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full lg:h-8 lg:w-8 dark:bg-blue-800 shrink-0">
                  <svg
                    className="w-2 h-2 text-blue-600 lg:w-3 lg:h-3 dark:text-gray-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <div className="absolute w-max -top-12 bg-blue-800 rounded-md px-4 py-1">
                    <span className="text-xs line-clamp-4 font-medium text-gray-100">
                      {career.contractStartDate}
                    </span>
                  </div>
                  <div className="absolute w-max top-12 text-white flex flex-col items-center">
                    <span>{career.jobTitle}</span>
                    <span>{career.contractType}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default Career;
