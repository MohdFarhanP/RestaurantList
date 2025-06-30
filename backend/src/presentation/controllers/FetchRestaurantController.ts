import { Request, Response } from "express";
import { FetchRestaurantUseCase } from "../../application/restaurantUseCase/FetchRestaurantUseCase";

export class FetchRestaurantController{
    public constructor(private readonly useCase:FetchRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
          
            const restaurants = await this.useCase.execute();
            res.status(200).json(restaurants);
        
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                res.send(500).json({msg:error.message})
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }
}