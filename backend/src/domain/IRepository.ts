import { RestaurantEntity } from "./RestaurantEntity";
import { UpdateRestaurantInput } from "../application/restaurantUseCase/UpdateRestaurantUseCase";

export interface IRepository {
    save(restaurant: RestaurantEntity): Promise<RestaurantEntity>;
    fetchAll():Promise<RestaurantEntity[]>;
    update(restaurant: UpdateRestaurantInput):Promise<RestaurantEntity>;
    delete(id:number):Promise<boolean>
}
