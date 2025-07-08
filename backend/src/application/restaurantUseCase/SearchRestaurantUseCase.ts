import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";
import { IUseCase } from "../../shared/IUseCase";
import { BaseUseCase } from "../base/BaseUseCase";

export class SearchRestaurantUseCase extends BaseUseCase implements IUseCase<string, RestaurantDTO[]> {
    public constructor(private readonly repo: IRepository) {
        super();
    }
    public async execute(searchQuary: string): Promise<RestaurantDTO[]> {
        return this.executeSafe(async () => {
            const data = await this.repo.search(searchQuary);
            return data.map((res) => new RestaurantDTO(res.id, res.name, res.contact, res.email, res.street, res.landmark, res.area, res.city, res.state, res.pincode, res.country, res.images));
        });
    }
}