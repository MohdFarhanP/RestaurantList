import { RestaurantEntity } from "../domain/RestaurantEntity";
import { CreateRestaurantOutput } from "./CreateRestaurantUseCase";

export interface IRepository {
    save(restaurant: RestaurantEntity): Promise<CreateRestaurantOutput>;
}
