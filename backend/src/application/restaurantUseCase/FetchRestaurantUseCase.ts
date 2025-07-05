import { RestaurantEntity } from "../../domain/RestaurantEntity";
import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";

export class FetchRestaurantUseCase implements IUseCase<void,RestaurantDTO[]>{
    public constructor(private readonly restaurantRepo: IRepository){

    }
    public async execute(): Promise<RestaurantEntity[]> {
        const restaurants = await this.restaurantRepo.fetchAll();
        return restaurants.map((res)=>new RestaurantDTO(res.id,res.name,res.contact,res.email,res.street,res.landmark,res.area,res.city,res.state,res.pincode,res.country));
    }
    
}