import { Request, Response } from "express";
import { SearchRestaurantUseCase } from "../../application/restaurantUseCase/SearchRestaurantUseCase";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export class SearchRestaurantController {
    public constructor(private readonly useCase: SearchRestaurantUseCase) {

    }

    public async handler(req: Request, res: Response): Promise<void> {
        try {
            const search = req.query.search;
            const restaurants = await this.useCase.execute(search!.toString());
            if (restaurants) {
                res.status(HttpStatusCode.OK).json({ data: restaurants });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ msg: error.message })
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

}