import axios from "axios";

interface Restaurant {
  id?: string;
  name: string;
  contact: string;
  email: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const AXIOS_BASE_URL = import.meta.env.VITE_AXIOS_BASEURL;


export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axios.get<Restaurant[]>(`${AXIOS_BASE_URL}/restaurant`);
    console.log('response',response)
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};


export const addRestaurant = async (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
  try {
    const response = await axios.post<Restaurant>(`${AXIOS_BASE_URL}/restaurant`, restaurant);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred');
    }
  }
};


export const updateRestaurant = async (restaurant: Restaurant): Promise<Restaurant> => {
  try {
    const response = await axios.put<Restaurant>(`${AXIOS_BASE_URL}/restaurant/${restaurant.id}`, restaurant);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        console.error(error.stack);
        throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred');
    }
  }
};


export const deleteRestaurant = async (id: string): Promise<void> => {
  try {
    await axios.delete<void>(`${AXIOS_BASE_URL}/restaurant/${id}`);
    return;
  } catch (error) {
    if (error instanceof Error) {
        console.error(error.stack);
        throw new Error(error.message);
    } else {
        throw new Error('An unknown error occurred');
    }
  }
};