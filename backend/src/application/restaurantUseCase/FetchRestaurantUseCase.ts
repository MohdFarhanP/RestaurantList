import { RestaurantEntity } from "../../domain/RestaurantEntity";
import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { RestaurantDTO } from "../../shared/dtos/RestaurantDTO";
import { BaseUseCase } from "../base/BaseUseCase";

interface FetchUseCaseParameter {
    page: number;
    limit: number;
}
interface FetchUseCaseResult {
    data: RestaurantDTO[];
    totalPage: number
}

export class FetchRestaurantUseCase extends BaseUseCase implements IUseCase<FetchUseCaseParameter, FetchUseCaseResult> {
    public constructor(private readonly restaurantRepo: IRepository) {
        super();
    }
    public async execute({ page, limit }: FetchUseCaseParameter): Promise<FetchUseCaseResult> {
        return this.executeSafe(async () => {
            const { data, total } = await this.restaurantRepo.fetchByLimit(page, limit);
            const totalPage = Math.ceil(total / limit);
            const restaurant = data.map((res) => new RestaurantDTO(res.id, res.name, res.contact, res.email, res.street, res.landmark, res.area, res.city, res.state, res.pincode, res.country, res.images));
            return { data: restaurant, totalPage }
        })
    }
}