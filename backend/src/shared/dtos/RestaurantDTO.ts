import { RestaurantEntity } from "../../domain/RestaurantEntity";


export class RestaurantDTO {
    public constructor(public readonly id: number, public name: string, public contact: string, public email: string, public street: string,public landmark: string, public area: string, public city: string, public state: string, public pincode: string,public country: string,public images: string[]) { }

    public static from(restaurant: RestaurantEntity): RestaurantDTO {
        return new RestaurantDTO(restaurant.id, restaurant.name, restaurant.contact, restaurant.email,restaurant.street,restaurant.landmark,restaurant.area,restaurant.city,restaurant.state,restaurant.pincode,restaurant.country,restaurant.images);
    }
}
