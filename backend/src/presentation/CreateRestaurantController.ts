import { Request, Response } from "express";
import { CreateRestaurantUseCase } from "../application/CreateRestaurantUseCase";

export class CreateRestaurantController{
    public constructor(private readonly useCase:CreateRestaurantUseCase){

    }

    public async handler(req:Request,res:Response):Promise<void>{

        const response = await this.useCase.exicute({
            name: req.body.name,
            contact: req.body.contact,
            address: req.body.address,
            email: req.body.email
        });
        res.status(201).json({data:response});
    }
    
}