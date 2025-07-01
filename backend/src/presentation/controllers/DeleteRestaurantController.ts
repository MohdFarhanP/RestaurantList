import { Request, Response } from "express";
import { DeleteRestaurantUseCase } from "../../application/restaurantUseCase/DeleteRestaurantUseCase";

export class DeleteRestaurantController{
    public constructor(private readonly useCase:DeleteRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
            const id = Number(req.params.id);
            const isDeleted = await this.useCase.execute(id);
            res.status(200).json({msg:isDeleted});
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