import { Request, Response } from "express";
import { CreateRestaurantUseCase } from "../../application/restaurantUseCase/CreateRestaurantUseCase";

export class CreateRestaurantController{
    public constructor(private readonly useCase:CreateRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
           
            const response = await this.useCase.execute({
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address,
                email: req.body.email
            });
            res.status(201).json(response);
        
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