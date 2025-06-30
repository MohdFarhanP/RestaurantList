import { RestaurantEntity } from "../domain/RestaurantEntity";
import { IRepository } from "./IRepository";

interface CreateRestaurantInput{
    name: string,
    address: string,
    contact: string,
    email:string
}

export interface CreateRestaurantOutput {
    id: number,
    name: string,
    contact: string,
    address: string,
    email:string
}

export class CreateRestaurantUseCase{
    constructor(private readonly restaurantRepo:IRepository){

    }
    public async exicute(data: CreateRestaurantInput):Promise<CreateRestaurantOutput >{
        const restaurant = new RestaurantEntity(data.name,data.contact,data.address,data.email);
        return this.restaurantRepo.save(restaurant);
    }
}   