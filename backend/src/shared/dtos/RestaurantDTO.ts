import { RestaurantEntity } from "../../domain/RestaurantEntity";


export class RestaurantDTO {
    public constructor(public readonly id: number, public name: string, public contact: string, public address: string, public email: string) { }

    public static from(restaurant: RestaurantEntity): RestaurantDTO {
        return new RestaurantDTO(restaurant.id, restaurant.name, restaurant.contact, restaurant.address, restaurant.email);
    }
}
