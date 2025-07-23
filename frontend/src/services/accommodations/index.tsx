import api from '../skoobtur';

export const getAccommodations = async () => {
  const response = await api.get('/hotels');
  return response.data;
};