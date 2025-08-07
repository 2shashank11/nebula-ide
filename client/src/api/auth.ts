import axios from './server-axios'

import type { SignupFormData, LoginFormData } from '../types/auth';

export const signup = (formData : SignupFormData) => {
  return axios.post('/auth/signup', formData);
};

export const login = (formData: LoginFormData) => {
  return axios.post('/auth/login', formData);
};

export const logout = () => {
  return axios.post('/auth/logout');
}