import { RestaurantEntity } from "./RestaurantEntity";
import { UpdateRestaurantInput } from "../application/restaurantUseCase/UpdateRestaurantUseCase";


export interface FetchByLimitResult{
    data:RestaurantEntity[];
    total:number
}

export interface IRepository {
    save(restaurant: RestaurantEntity): Promise<RestaurantEntity>;
    fetchByLimit(page:number,limit:number):Promise<FetchByLimitResult>;
    update(restaurant: UpdateRestaurantInput):Promise<RestaurantEntity>;
    delete(id:number):Promise<boolean>
}
