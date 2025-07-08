import { IUseCase } from "../../shared/IUseCase";
import { RestaurantInput } from "./CreateRestaurantUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";
import { BaseUseCase } from "../base/BaseUseCase";

export interface UpdateRestaurantInput extends RestaurantInput {
    id: number,
}

export class UpdateRestaurantUseCase extends BaseUseCase implements IUseCase<UpdateRestaurantInput, RestaurantDTO> {
    public constructor(private readonly restaurantRepo: IRepository) {
        super();
    }
    public async execute(restaurant: UpdateRestaurantInput): Promise<RestaurantDTO> {
        return this.executeSafe(async () => {
            const updatedRestaurant = await this.restaurantRepo.update(restaurant);
            return RestaurantDTO.from(updatedRestaurant);
        })
    }
}   