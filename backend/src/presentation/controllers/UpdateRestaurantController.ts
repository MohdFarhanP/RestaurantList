import { Request, Response } from "express";
import { UpdateRestaurantUseCase } from "../../application/restaurantUseCase/UpdateRestaurantUseCase";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export class UpdateRestaurantController {
    public constructor(private readonly useCase:UpdateRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
            const id = Number(req.params.id); 
            const {name,contact,email,street,landmark,area,city,state,pincode,country,images} = req.body;
            
            const updatedRestaurant = await this.useCase.execute({id,name,contact,email,street,landmark,area,city,state,pincode,country,images});
            res.status(200).json(updatedRestaurant);
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