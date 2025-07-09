import { Request, Response } from "express";
import { DeleteRestaurantUseCase } from "../../application/restaurantUseCase/DeleteRestaurantUseCase";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export class DeleteRestaurantController{
    public constructor(private readonly useCase:DeleteRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
            const id = Number(req.params.id);
            const isDeleted = await this.useCase.execute(id);
            res.status(HttpStatusCode.OK).json({msg:isDeleted});
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({msg:error.message})
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }

}