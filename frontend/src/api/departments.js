import api from ".";

export const getDepartments = () => {
  return api.get("departments");
};

export const getDepartment = (id) => {
  return api.get(`departments/${id}`);
};

export const storeDepartment = (data) => {
  return api.post("departments", data);
};

export const updateDepartment = (id, data) => {
  return api.put(`departments/${id}`, data);
};

export const deleteDepartment = (id) => {
  return api.delete(`departments/${id}`);
};
