import { FetchByLimitResult, IRepository } from "../../../domain/IRepository";
import { UpdateRestaurantInput } from "../../../application/restaurantUseCase/UpdateRestaurantUseCase";
import { RestaurantEntity } from "../../../domain/RestaurantEntity";
import { Restaurant } from "../models/restaurant";
import { Op } from "sequelize";
import { BaseRepository } from "../../base/BaseRepository";


export class SequelizeRestaurantRepository extends BaseRepository implements IRepository {
    public constructor(private readonly model: typeof Restaurant) {
        super();
    }

    public async save(data: RestaurantEntity): Promise<RestaurantEntity> {
        return this.runSafe(async () => {
            if (!data) throw new Error("Data must be provided");

            const existRestorent = await this.model.findOne({ where: { [Op.or]: [{ email: data.email }, { contact: data.contact }] } });
            if (existRestorent) throw new Error('Restaurant with this email or contact already exist');

            const result = await this.model.create({
                name: data.name,
                contact: data.contact,
                email: data.email,
                street: data.street,
                landmark: data.landmark,
                area: data.area,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                country: data.country,
                images: data.images
            });
            if (!result) throw new Error("Create failed");
            return new RestaurantEntity(result.name, result.contact, result.email, result.street, result.landmark, result.area, result.city, result.state, result.pincode, result.country, result.images, result.id);
        });
    }

    public async fetchByLimit(page: number, limit: number): Promise<FetchByLimitResult> {
        return this.runSafe(async () => {
            const offset = (page - 1) * limit;
            const { count, rows } = await this.model.findAndCountAll({
                offset,
                limit
            });
            const data = rows.map((res) => new RestaurantEntity(res.dataValues.name, res.dataValues.contact, res.dataValues.email, res.dataValues.street, res.dataValues.landmark, res.dataValues.area, res.dataValues.city, res.dataValues.state, res.dataValues.pincode, res.dataValues.country, res.images, res.dataValues.id));
            return { data, total: count }
        });
    }

    public async update(restaurant: UpdateRestaurantInput): Promise<RestaurantEntity> {
        return this.runSafe(async () => {

            const existRestorent = await this.model.findOne({ where: { [Op.or]: [{ email: restaurant.email }, { contact: restaurant.contact }], id: { [Op.not]: restaurant.id } } });
            if (existRestorent) throw new Error('Restaurant with this email or contact already exist');

            const [affectedRows] = await this.model.update(restaurant, {
                where: {
                    id: restaurant.id
                }
            });

            if (affectedRows === 0) {
                throw new Error("Update failed: Restaurant not found");
            }
            const updatedRestaurant = await this.model.findByPk(restaurant.id);

            if (!updatedRestaurant) throw new Error('update failed recored not found after update');

            return new RestaurantEntity(updatedRestaurant.name, updatedRestaurant.contact, updatedRestaurant.email, updatedRestaurant.street, updatedRestaurant.landmark, updatedRestaurant.area, updatedRestaurant.city, updatedRestaurant.state, updatedRestaurant.pincode, updatedRestaurant.country, updatedRestaurant.images, updatedRestaurant.id);
        });
    }

    public async delete(id: number): Promise<boolean> {
        return this.runSafe(async () => {
            const deleteCount = await this.model.destroy({
                where: { id }
            });

            return deleteCount > 0;
        })
    }

    public async search(searchQuary: string): Promise<RestaurantEntity[]> {
        return this.runSafe(async () => {

            const restaurants = await this.model.findAll({
                where: { name: { [Op.iLike]: `%${searchQuary}%` } }
            });

            return restaurants.map((res) => new RestaurantEntity(res.name, res.contact, res.email, res.street, res.landmark, res.area, res.city, res.state, res.pincode, res.country, res.images, res.id));
        });
    }

}