import api from ".";

export const getEmployees = () => {
  return api.get("employees");
};

export const getEmployee = (id) => {
  return api.get(`employees/${id}`);
};

export const storeEmployee = (data) => {
  return api.post("employees", data);
};

export const updateEmployee = (id, data) => {
  return api.put(`employees/${id}`, data);
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
