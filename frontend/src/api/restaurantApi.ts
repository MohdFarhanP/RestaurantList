import axios from "axios";
import { safeApiCall } from "../utils/safeApiCall";

interface FetchRestaurantResult {
  data: Restaurant[];
  totalPage: number
}
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
  images: string[];
}

const AXIOS_BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL;
console.log(AXIOS_BASE_URL)


export const fetchRestaurants = (page: number, limit = 4) =>
  safeApiCall(() =>
    axios
      .get<FetchRestaurantResult>(
        `${AXIOS_BASE_URL}/restaurant/fetchRestaurant?page=${page}&limit=${limit}`
      )
      .then((res) => res.data)
  )


export const searchRestaurant = (searchQuary: string) =>
  safeApiCall(() =>
    axios
      .get<{ data: Restaurant[] }>(
        `${AXIOS_BASE_URL}/restaurant?search=${searchQuary}`
      )
      .then((res) => res.data?.data)
  )



export const addRestaurant = (restaurant: Omit<Restaurant, 'id'>) =>
  safeApiCall(() =>
    axios
      .post<Restaurant>(
        `${AXIOS_BASE_URL}/restaurant/addRestaurant`, restaurant
      ).then((res) => res.data)
  )


export const updateRestaurant = (restaurant: Restaurant) =>
  safeApiCall(() =>
    axios
      .put<Restaurant>(
        `${AXIOS_BASE_URL}/restaurant/updateRestaurant/${restaurant.id}`, restaurant
      )
      .then((res) => res.data)
  )


export const deleteRestaurant = async (id: string) =>
  safeApiCall(() =>
    axios
      .delete<void>(
        `${AXIOS_BASE_URL}/restaurant/deleteRestaurant/${id}`
      )
  )
