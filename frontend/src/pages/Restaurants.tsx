import { MOCK_RESTAURANTS } from './mockData';
import TravelPackages from '../components/TravelPackages';

const Restaurants = () => {
  return (
    <TravelPackages customPackages={MOCK_RESTAURANTS} hideTitle detailRoute="restaurant" />
  );
};

export default Restaurants; 