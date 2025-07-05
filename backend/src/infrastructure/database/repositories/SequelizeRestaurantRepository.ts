import { IRepository } from "../../../domain/IRepository";
import { UpdateRestaurantInput } from "../../../application/restaurantUseCase/UpdateRestaurantUseCase";
import { RestaurantEntity } from "../../../domain/RestaurantEntity";
import { Restaurant } from "../models/restaurant";


export class SequelizeRestaurantRepository implements IRepository{
    public constructor(private readonly model: typeof Restaurant){

    }

    public async save (data:RestaurantEntity): Promise<RestaurantEntity> {
        try {
       
            if (!data) throw new Error("Data must be provided");
            const result = await this.model.create({
                name:data.name,
                contact:data.contact,
                email:data.email,
                street:data.street,
                landmark:data.landmark,
                area:data.area,
                city:data.city,
                state:data.state,
                pincode:data.pincode,
                country:data.country
            });
            if (!result) throw new Error("Create failed");
            return new RestaurantEntity(result.name,result.contact,result.email,result.street,result.landmark,result.area,result.city,result.state,result.pincode,result.country,result.id);
       
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    public async fetchAll(): Promise<RestaurantEntity[]> {
        try {
       
            const restaurants = await this.model.findAll();
            return restaurants.map((res)=> new RestaurantEntity(res.dataValues.name,res.dataValues.contact,res.dataValues.email,res.dataValues.street,res.dataValues.landmark,res.dataValues.area,res.dataValues.city,res.dataValues.state,res.dataValues.pincode,res.dataValues.country,res.dataValues.id)); 
       
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }

    public async update(restaurant: UpdateRestaurantInput): Promise<RestaurantEntity> {
        try {
            const [affectedRows] = await this.model.update(restaurant,{
                where:{
                    id:restaurant.id
                }
            });
        
            if (affectedRows === 0) {
                throw new Error("Update failed: Restaurant not found");
            }
            const updatedRestaurant = await this.model.findByPk(restaurant.id);

            if(!updatedRestaurant) throw new Error('update failed recored not found after update');

            return new RestaurantEntity(updatedRestaurant.name,updatedRestaurant.contact,updatedRestaurant.email,updatedRestaurant.street,updatedRestaurant.landmark,updatedRestaurant.area,updatedRestaurant.city,updatedRestaurant.state,updatedRestaurant.pincode,updatedRestaurant.country,updatedRestaurant.id);
        } catch (error) {
             if (error instanceof Error) {
                console.error(error.stack);
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const deleteCount = await this.model.destroy({
            where: {id}
            });

            return deleteCount > 0;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.stack);
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            } 
        }
    }
    
}