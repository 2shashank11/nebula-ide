import axios from './server-axios';

export const getUserProfile = () => {
  return axios.get('/user/info');
};

// export const updateUserProfile = (data) => {
//   return axios.put('/user/update', data);
// };
