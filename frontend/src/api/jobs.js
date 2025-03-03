import api from ".";

export const getJobs = () => {
  return api.get("jobs");
};

export const getJob = (id) => {
  return api.get(`jobs/${id}`);
};

export const storeJob = (data) => {
  return api.post("jobs", data);
};

export const updateJob = (id, data) => {
  return api.put(`jobs/${id}`, data);
};

export const deleteJob = (id) => {
  return api.delete(`jobs/${id}`);
};
