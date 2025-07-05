import { RestaurantEntity } from "../../domain/RestaurantEntity";
import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";

export interface RestaurantInput{
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

export class CreateRestaurantUseCase implements IUseCase<RestaurantInput,RestaurantDTO>{

    public constructor(private readonly restaurantRepo:IRepository){

    }
    public async execute(data: RestaurantInput):Promise<RestaurantDTO >{
        const restaurant = new RestaurantEntity(data.name,data.contact,data.email,data.street,data.landmark,data.area,data.city,data.state,data.pincode,data.country);
        const newRestaurant = await this.restaurantRepo.save(restaurant);
        return RestaurantDTO.from(newRestaurant);
    }
}   