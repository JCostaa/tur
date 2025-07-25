import api from '../api';

export const getExperiences = async () => {
  const response = await api.get('/experiences');
  return response.data;
};