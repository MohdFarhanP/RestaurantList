import { CreateRestaurantUseCase } from "./application/restaurantUseCase/CreateRestaurantUseCase";
import { SequelizeRestaurantRepository } from "./infrastructure/database/repositories/SequelizeRestaurantRepository";
import { ApiServer } from "./presentation/ApiServer";
import { CreateRestaurantController } from "./presentation/controllers/CreateRestaurantController";
import { FetchRestaurantController } from "./presentation/controllers/FetchRestaurantController";
import { FetchRestaurantUseCase } from "./application/restaurantUseCase/FetchRestaurantUseCase";
import { UpdateRestaurantController } from "./presentation/controllers/UpdateRestaurantController";
import { UpdateRestaurantUseCase } from "./application/restaurantUseCase/UpdateRestaurantUseCase";
import { initializeModels, Restaurant, sequelize } from "./infrastructure/database/db";
import { DeleteRestaurantController } from "./presentation/controllers/DeleteRestaurantController";
import { DeleteRestaurantUseCase } from "./application/restaurantUseCase/DeleteRestaurantUseCase";
import dotenv from 'dotenv'
import { SearchRestaurantController } from "./presentation/controllers/SearchRestaurantController";
import { SearchRestaurantUseCase } from "./application/restaurantUseCase/SearchRestaurantUseCase";
dotenv.config();

export async function main():Promise<void> {
    try {
        
        await sequelize.authenticate();
        initializeModels();
        
        const sequelizeRestarantRepository = new SequelizeRestaurantRepository(Restaurant)
        const createRestaurantUseCase = new CreateRestaurantUseCase(sequelizeRestarantRepository);
        const fetchRestaurantUseCase = new FetchRestaurantUseCase(sequelizeRestarantRepository);
        const searchRestaurantUseCase = new SearchRestaurantUseCase(sequelizeRestarantRepository);
        const updateRestaurantUseCase = new UpdateRestaurantUseCase(sequelizeRestarantRepository);
        const deleteRestaurantUseCase = new DeleteRestaurantUseCase(sequelizeRestarantRepository);
        const createRestraurantController = new CreateRestaurantController(createRestaurantUseCase);
        const fetchRestaurantController = new FetchRestaurantController(fetchRestaurantUseCase);
        const searchRestaurantController = new SearchRestaurantController(searchRestaurantUseCase);
        const updateRestaurantController = new UpdateRestaurantController(updateRestaurantUseCase);
        const deleteRestaurantController = new DeleteRestaurantController(deleteRestaurantUseCase);
        
        ApiServer.run(Number(process.env.PORT), createRestraurantController,fetchRestaurantController,updateRestaurantController,deleteRestaurantController,searchRestaurantController);
    } catch (error) {
        console.error('unable to connect to the database',error)
    }
}
main();