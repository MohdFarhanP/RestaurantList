import express from 'express'
import { CreateRestaurantController } from './controllers/CreateRestaurantController';
import { FetchRestaurantController } from './controllers/FetchRestaurantController';
import { UpdateRestaurantController } from './controllers/UpdateRestaurantController';
import { DeleteRestaurantController } from './controllers/DeleteRestaurantController';
import { restaurantRouter } from './routes/restaurantRoutes';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

export class ApiServer{
    public static async run(port:number,createRestaurantController:CreateRestaurantController,fetchRestaurantController:FetchRestaurantController,updateRestaurantController:UpdateRestaurantController,deleteRestaurantController:DeleteRestaurantController):Promise<void>{

        const app = express();

        app.use(cors({
            origin: [process.env.FRONTENT_URL!],
            credentials: true
        }));
        app.use(express.json());

        app.use('/restaurant',restaurantRouter(createRestaurantController,fetchRestaurantController,updateRestaurantController,deleteRestaurantController));

        app.listen(port,()=>{
            console.log('server is running');
        })
    
    }
}