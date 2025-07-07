import { Request, Response } from "express";
import { SearchRestaurantUseCase } from "../../application/restaurantUseCase/SearchRestaurantUseCase";

export class SearchRestaurantController {
    public constructor(private readonly useCase: SearchRestaurantUseCase) {

    }

    public async handler(req: Request, res: Response): Promise<void> {
        try {
            const search = req.query.search;
            const restaurants = await this.useCase.execute(search!.toString());
            if (restaurants) {
                res.status(200).json({ data: restaurants });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                res.status(500).json({ msg: error.message })
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

}