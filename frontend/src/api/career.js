import api from ".";

export const getCareers = () => {
  return api.get("Careers");
};

export const getCareer = (id) => {
  return api.get(`careers/${id}`);
};

export const storeCareer = (data) => {
  return api.post("careers", data);
};

export const updateCareer = (id, data) => {
  return api.put(`careers/${id}`, data);
};

export const deleteCareer = (id) => {
  return api.delete(`careers/${id}`);
};
