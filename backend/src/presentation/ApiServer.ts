import express from 'express'
import { CreateRestaurantController } from './controllers/CreateRestaurantController';
import { FetchRestaurantController } from './controllers/FetchRestaurantController';
import { UpdateRestaurantController } from './controllers/UpdateRestaurantController';
import { DeleteRestaurantController } from './controllers/DeleteRestaurantController';
import { restaurantRouter } from './routes/restaurantRoutes';
import cors from 'cors';
import dotenv from 'dotenv'
import { SearchRestaurantController } from './controllers/SearchRestaurantController';
import rateLimit from "express-rate-limit";
dotenv.config();
export class ApiServer {

    public static async run(port: number, createRestaurantController: CreateRestaurantController, fetchRestaurantController: FetchRestaurantController, updateRestaurantController: UpdateRestaurantController, deleteRestaurantController: DeleteRestaurantController, searchRestaurantController: SearchRestaurantController): Promise<void> {

        const app = express();

        const limiter = rateLimit({
            windowMs: 60 * 1000,
            max: 10,
            message: "Too many requests, try again later."
        });
        app.use(limiter);


        console.log("Allowed CORS origin:", process.env.FRONTEND_URL);
        app.use(cors({
            origin: process.env.FRONTEND_URL!,
            credentials: true
        }));
        app.use(express.json());

        if (process.env.NODE_ENV === 'production') {
            app.get('/test-response', (req, res) => {
                res.json({ hello: 'world' });
            });
        }

        app.use('/restaurant', restaurantRouter(createRestaurantController, fetchRestaurantController, updateRestaurantController, deleteRestaurantController, searchRestaurantController));

        app.listen(port, () => {
            console.log('server is running');
        })

    }
}