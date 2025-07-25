import { getProviders } from '../providers';

export const getDrivers = async () => {
  return await getProviders('drivers');
}; 