import api from '../skoobtur';

export const getRestaurants = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};