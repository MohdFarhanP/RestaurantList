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
        try {
            const updatedRestaurant = await this.restaurantRepo.update(restaurant);
            return RestaurantDTO.from(updatedRestaurant);   
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }   
        }
    }

}   