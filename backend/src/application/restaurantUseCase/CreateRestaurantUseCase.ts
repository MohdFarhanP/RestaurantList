import { RestaurantEntity } from "../../domain/RestaurantEntity";
import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";
import { BaseUseCase } from "../base/BaseUseCase";

export interface RestaurantInput {
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
  images: string[];
}

export class CreateRestaurantUseCase extends BaseUseCase implements IUseCase<RestaurantInput, RestaurantDTO> {

  public constructor(private readonly restaurantRepo: IRepository) {
    super();
  }
  public async execute(data: RestaurantInput): Promise<RestaurantDTO> {
    return this.executeSafe(async () => {
      const restaurant = new RestaurantEntity(data.name, data.contact, data.email, data.street, data.landmark, data.area, data.city, data.state, data.pincode, data.country, data.images);
      const newRestaurant = await this.restaurantRepo.save(restaurant);
      return RestaurantDTO.from(newRestaurant);
    });
  }
}   