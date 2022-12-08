import { api } from './';

export const getUsers = () => api.get(`/api/v1/users`);

export const modifyUser = (id, payload) =>
  api.put(`/api/v1/users/${id}`, payload);

export const getUser = ({ userId }) => api.get(`/api/v1/users/${userId}`);
export const addUser = (payload) => api.post(`/api/v1/users`, payload);
export const deleteUser = (userId) => api.delete(`/api/v1/users/${userId}`);
