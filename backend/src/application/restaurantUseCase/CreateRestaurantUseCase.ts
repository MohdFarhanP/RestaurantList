import { RestaurantEntity } from "../../domain/RestaurantEntity";
import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";

export interface RestaurantInput{
    name: string,
    address: string,
    contact: string,
    email:string
}

export class CreateRestaurantUseCase implements IUseCase<RestaurantInput,RestaurantDTO>{

    public constructor(private readonly restaurantRepo:IRepository){

    }
    public async execute(data: RestaurantInput):Promise<RestaurantDTO >{
        const restaurant = new RestaurantEntity(data.name,data.contact,data.address,data.email);
        const newRestaurant = await this.restaurantRepo.save(restaurant);
        return RestaurantDTO.from(newRestaurant);
    }
}   