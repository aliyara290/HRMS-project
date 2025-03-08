import api from ".";

export const getLeaves = () => {
  return api.get("leaveRequest");
};
export const getPendingLeaves = () => {
  return api.get("pendingLeaves");
};

export const getLeave = (id) => {
  return api.get(`leaveRequest/${id}`);
};

export const storeLeave = (data) => {
  return api.post("leaveRequest", data);
};