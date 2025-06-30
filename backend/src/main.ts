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
dotenv.config();

export async function main():Promise<void> {
    try {
        
        await sequelize.authenticate();
        initializeModels();
        
        const sequelizeRestarantRepository = new SequelizeRestaurantRepository(Restaurant)
        const createRestaurantUseCase = new CreateRestaurantUseCase(sequelizeRestarantRepository);
        const fetchRestaurantUseCase = new FetchRestaurantUseCase(sequelizeRestarantRepository);
        const updateRestaurantUseCase = new UpdateRestaurantUseCase(sequelizeRestarantRepository);
        const deleteRestaurantUseCase = new DeleteRestaurantUseCase(sequelizeRestarantRepository);
        const createRestraurantController = new CreateRestaurantController(createRestaurantUseCase);
        const fetchRestaurantController = new FetchRestaurantController(fetchRestaurantUseCase);
        const updateRestaurantController = new UpdateRestaurantController(updateRestaurantUseCase);
        const deleteRestaurantController = new DeleteRestaurantController(deleteRestaurantUseCase);
        
        ApiServer.run(Number(process.env.PORT), createRestraurantController,fetchRestaurantController,updateRestaurantController,deleteRestaurantController);
    } catch (error) {
        console.error('unable to connect to the database',error)
    }
}
main();