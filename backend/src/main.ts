import { CreateRestaurantUseCase } from "./application/CreateRestaurantUseCase";
import { IRepository } from "./application/IRepository";
import { InMemoryLocalRepository } from "./infrastructure/InMemoryLocalRepository";
import { SequelizeRestaurantRepository } from "./infrastructure/SequelizeRestaurantRepository";
import { ApiServer } from "./presentation/ApiServer";
import { CreateRestaurantController } from "./presentation/CreateRestaurantController";
import { sequelize, Restaurant, initializeModels } from './infrastructure/database/db';

export async function main():Promise<void> {
    try {
        
        await sequelize.authenticate();
        initializeModels();
        
        const inMemoryRepo:IRepository = new InMemoryLocalRepository();
        const sequelizeRestarantRepository = new SequelizeRestaurantRepository(Restaurant)
        const createRestaurantUseCase = new CreateRestaurantUseCase(sequelizeRestarantRepository);
        const createRestraurantController = new CreateRestaurantController(createRestaurantUseCase);
        
        ApiServer.run(5000, createRestraurantController);
    } catch (error) {
        console.error('unable to connect to the database',error)
    }
}
main();