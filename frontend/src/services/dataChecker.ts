import { getTours } from './tours';
import { getEvents } from './events';
import { getRestaurants } from './restaurants';
import { getAccommodations } from './accommodations';
import { getProviders } from './providers';
import { getExperiences } from './experiences';

export interface SectionAvailability {
  tours: boolean;
  events: boolean;
  restaurants: boolean;
  accommodations: boolean;
  agencies: boolean;
  guides: boolean;
  drivers: boolean;
  experiences: boolean;
}

export const checkDataAvailability = async (): Promise<SectionAvailability> => {
  const results: SectionAvailability = {
    tours: false,
    events: false,
    restaurants: false,
    accommodations: false,
    agencies: false,
    guides: false,
    drivers: false,
    experiences: false,
  };

  try {
    // Check tours
    const toursData = await getTours();
    results.tours = toursData?.data?.tours?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking tours:', error);
    results.tours = false;
  }

  try {
    // Check events
    const eventsData = await getEvents();
    results.events = eventsData?.data?.attractions?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking events:', error);
    results.events = false;
  }

  try {
    // Check restaurants
    const restaurantsData = await getRestaurants();
    results.restaurants = restaurantsData?.data?.restaurants?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking restaurants:', error);
    results.restaurants = false;
  }

  try {
    // Check accommodations
    const accommodationsData = await getAccommodations();
    results.accommodations = accommodationsData?.data?.hotels?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking accommodations:', error);
    results.accommodations = false;
  }

  try {
    // Check agencies
    const agenciesData = await getProviders('agencies');
    results.agencies = agenciesData?.data?.providers?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking agencies:', error);
    results.agencies = false;
  }

  try {
    // Check guides
    const guidesData = await getProviders('guides');
    results.guides = guidesData?.data?.providers?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking guides:', error);
    results.guides = false;
  }

  try {
    // Check drivers
    const driversData = await getProviders('drivers');
    results.drivers = driversData?.data?.providers?.length > 0 || false;
  } catch (error) {
    console.warn('Error checking drivers:', error);
    results.drivers = false;
  }

  try {
    // Check experiences
    const experiencesData = await getExperiences();
    results.experiences = Array.isArray(experiencesData) && experiencesData.length > 0;
  } catch (error) {
    console.warn('Error checking experiences:', error);
    results.experiences = false;
  }

  return results;
};
