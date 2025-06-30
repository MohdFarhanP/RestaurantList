import express from 'express'
import { CreateRestaurantController } from './CreateRestaurantController';

export class ApiServer{
    public static async run(port:number,createRestaurantController:CreateRestaurantController):Promise<void>{

        const app = express();
        app.use(express.json());

        app.post('/restaurant',(req, res)=>createRestaurantController.handler(req,res))

        app.listen(port,()=>{
            console.log('server is running');
        })
    
    }
}