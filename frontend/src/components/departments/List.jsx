import React, { useEffect, useState } from "react";
import { getDepartments } from "../../api/departments";
import { storeDepartment } from "../../api/departments";
import { deleteDepartment } from "../../api/departments";
import { updateDepartment } from "../../api/departments";
import { getDepartment } from "../../api/departments";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState({
    name: "",
    managerId: null,
  });
  const [loading, setLoading] = useState(true);
  const [isClose, setIsClose] = useState(true);
  const [isPost, setIsPost] = useState(true);
  const [depId, setDepId] = useState(null);

  useEffect(() => {
    getDepartments()
      .then((response) => {
        setLoading(true);
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteDepartment(id)
      .then(() => {
        toast.success("Employee deleted successfully");

        getDepartments()
          .then((response) => {
            setDepartments(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching departments:", error);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to deleted employee");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPost) {
      storeDepartment(data)
        .then((response) => {
          toast.success(`${data.name} created successfully`);
          
          getDepartments()
            .then((response) => {
              setDepartments(response.data.data);
            })
            .catch((error) => {
              console.error("Error fetching departments:", error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error(`failed to create ${data.name}`);
        })
        .finally(() => {
          setData({
            name: "",
            managerId: null,
          });
          setIsClose(true);
        });
        
    } else if(isPost == false) {
      updateDepartment(depId, data)
        .then((response) => {
          toast.success(`${data.name} updated successfully`);
          setData({
            name: "",
            managerId: null,
          });
          getDepartments()
            .then((response) => {
              setDepartments(response.data.data);
            })
            .catch((error) => {
              console.error("Error fetching departments:", error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error(`failed to update ${data.name}`);
        })
        .finally(() => {
          setIsClose(true);
          setIsPost(true);
        });
        
    }
  };

  const handleClick = (id = null) => {
    if (id != null) {
      setDepId(id);
      setLoading(true);
      setIsPost(false);
      getDepartment(id)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsPost(true);
    }
    setIsClose(false);
  };
  const handleClose = () => {
    setData({
      name: "",
      managerId: null,
    });
    setIsClose(true);
    setIsPost(true);
  };

  return (
    <section className=" h-full">
      {loading ? (
        <div className="absolute bg-gray-900 opacity-60 top-0 left-0 w-full h-full z-52 flex justify-center items-center">
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

      <div className="mb-10 flex justify-between items-center">
        <h2 className="text-white text-3xl font-bold">Departments list</h2>
        <button
          onClick={() => handleClick()}
          className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium cursor-pointer"
        >
          New Department
        </button>
      </div>
      <div
        className={`absolute w-full min-h-screen z-40 top-0 left-0 bg-[#101828ae] flex justify-center items-center ${
          isClose ? "hidden" : ""
        }`}
      >
        <div className="bg-gray-700 p-5 rounded-xl relative">
          <div className="flex justify-center pb-6">
            <h3 className="text-white text-xl font-medium">
              Add new department
            </h3>
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
          <div class="min-w-lg">
            <form action="#" onSubmit={handleSubmit}>
              <div class="grid gap-2 sm:grid-cols-1 sm:gap-4">
                <div class="">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Manager
                  </label>
                  <select
                    id="managerId"
                    name="managerId"
                    value={data.managerId}
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected disabled>
                      Select Manager
                    </option>
                    <option selected="">Ali</option>
                    <option value="1">Aymane</option>
                    <option value="4">Khalid</option>
                    <option value="6">Oumayma/Console</option>
                    <option value="12">Youness</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700 cursor-pointer"
                >
                  Add department
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="">
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-100 dark:bg-gray-800">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Department name
              </th>
              <th scope="col" className="px-6 py-3">
                Department manager
              </th>
              
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0
              ? departments.map((dep) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4">{dep.id}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {dep.name}
                    </th>
                    <td className="px-6 py-4">{dep.managerName}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        onClick={() => handleClick(dep.id)}
                        className="group cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 text-blue-500 hover:text-blue-600 group-hover:scale-105"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDelete(dep.id)}
                        className="group cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 text-red-500 hover:text-red-600 group-hover:scale-105"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DepartmentsList;
