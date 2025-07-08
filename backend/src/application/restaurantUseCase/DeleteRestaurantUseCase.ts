import { IUseCase } from "../../shared/IUseCase";
import { IRepository } from "../../domain/IRepository";
import { BaseUseCase } from "../base/BaseUseCase";


export class DeleteRestaurantUseCase extends BaseUseCase implements IUseCase<number,boolean>{
    public constructor(private readonly restraurantRepo:IRepository){
        super();
    }
    public async execute(id: number): Promise<boolean> {
        return this.executeSafe(async()=>{
            const isDeleted = await this.restraurantRepo.delete(id);
        return isDeleted;
        })
    }
}