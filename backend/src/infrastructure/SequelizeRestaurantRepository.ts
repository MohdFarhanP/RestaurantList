import { CreateRestaurantOutput } from "../application/CreateRestaurantUseCase";
import { IRepository } from "../application/IRepository";
import { RestaurantEntity } from "../domain/RestaurantEntity";
import { Restaurant } from "./database/models/restaurant";


export class SequelizeRestaurantRepository implements IRepository{
    public constructor(private readonly model: typeof Restaurant){

    }

    public async save (data:RestaurantEntity): Promise<CreateRestaurantOutput> {
        if (!data) throw new Error("Data must be provided");
        const result = await this.model.create({
            name:data.name,
            contact:data.contact,
            address:data.address,
            email:data.email
        });
        if (!result) throw new Error("Create failed");
        return {
            id:result.id,
            name:result.name,
            contact:result.contact,
            address:result.address,
            email:result.email
        }
    }
}