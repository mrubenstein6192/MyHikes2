import axios from 'axios';

// getUserProfile
export const getUserProfile = () => {
  return axios.get('/api/user')
};

// createEntry
export const createHike = (hikeInfo) => {
  return axios.post('/api/hike', hikeInfo);
};

// getAllEntries
// export const getAllEntries = () => {
//   return axios.get('/api/entry');
// };

// getEntryById
export const getHikeById = (hikeId) => {
  return axios.get(`/api/hike/${hikeId}`);
};

// updateEntry,
export const updateHike = (hikeId, hikeInfo) => {
  return axios.put(`/api/hike/${hikeId}`, hikeInfo);
};

// deleteEntry
export const deleteHike = (hikeId) => {
  return axios.delete(`/api/hike/${hikeId}`);
};

export const loginCheck = () => {
  return axios.get('/auth/status');
}

export default {
  getUserProfile,
  createHike,
  getHikeById,
  updateHike,
  deleteHike,
  loginCheck
};