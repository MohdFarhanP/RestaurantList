import { Request, Response } from "express";
import { FetchRestaurantUseCase } from "../../application/restaurantUseCase/FetchRestaurantUseCase";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export class FetchRestaurantController{
    public constructor(private readonly useCase:FetchRestaurantUseCase){

    }
    public async handler(req:Request,res:Response):Promise<void>{
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const {data,totalPage} = await this.useCase.execute({page,limit});
            res.status(HttpStatusCode.OK).json({data:data,totalPage});
        
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