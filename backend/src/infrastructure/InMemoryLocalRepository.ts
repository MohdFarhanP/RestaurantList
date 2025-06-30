import { CreateRestaurantOutput } from "../application/CreateRestaurantUseCase";
import { IRepository } from "../application/IRepository";
import { RestaurantEntity } from "../domain/RestaurantEntity";

export class InMemoryLocalRepository implements IRepository{

    private readonly restaurants: RestaurantEntity[] = [];
    
    public async save(restaurant: RestaurantEntity): Promise<CreateRestaurantOutput> {
        await this.restaurants.push(restaurant);
        return {
            id:Number(restaurant.id),
            name: restaurant.name,
            contact: restaurant.contact,
            address: restaurant.address,
            email:restaurant.email
        };
    }
}