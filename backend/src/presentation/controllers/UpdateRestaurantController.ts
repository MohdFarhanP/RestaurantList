import { Request, Response } from "express";
import { UpdateRestaurantUseCase } from "../../application/restaurantUseCase/UpdateRestaurantUseCase";

export class UpdateRestaurantController {
    public constructor(private readonly useCase:UpdateRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
            const id = Number(req.params.id); 
            const {name,contact,address,email} = req.body;
            
            const updatedRestaurant = await this.useCase.execute({id,name,contact,address,email});
            res.status(200).json({data:updatedRestaurant});
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                res.status(500).json({msg:error.message})
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }
}