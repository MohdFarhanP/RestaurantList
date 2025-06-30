import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";


export class DeleteRestaurantUseCase implements IUseCase<number,boolean>{
    public constructor(private readonly restraurantRepo:IRepository){

    }
    public async execute(id: number): Promise<boolean> {
        const isDeleted = await this.restraurantRepo.delete(id);
        return isDeleted;
    }
}