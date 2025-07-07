import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";
import { IUseCase } from "../../shared/IUseCase";

export class SearchRestaurantUseCase implements IUseCase<string, RestaurantDTO[]> {
    public constructor(private readonly repo: IRepository) {

    }
    public async execute(searchQuary: string): Promise<RestaurantDTO[]> {
        try {
            const data = await this.repo.search(searchQuary);
            return data.map((res)=> new RestaurantDTO(res.id,res.name,res.contact,res.email,res.street,res.landmark,res.area,res.city,res.state,res.pincode,res.country,res.images));
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