import api from '../skoobtur';

export const getTours = async () => {
  const response = await api.get('/tours');
  return response.data;
};