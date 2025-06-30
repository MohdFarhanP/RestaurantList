import { IUseCase } from "../../shared/IUseCase";
import { RestaurantInput } from "./CreateRestaurantUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";

export interface UpdateRestaurantInput extends RestaurantInput{
    id:number,
}

export class UpdateRestaurantUseCase implements IUseCase<UpdateRestaurantInput, RestaurantDTO>{
    public constructor(private readonly restaurantRepo:IRepository){

    }
    public async execute(restaurant: UpdateRestaurantInput): Promise<RestaurantDTO> {
        const updatedRestaurant = await this.restaurantRepo.update(restaurant);
        return RestaurantDTO.from(updatedRestaurant);
    }

}   