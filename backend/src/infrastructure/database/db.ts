import { Sequelize } from 'sequelize';
import { initRestaurantModel, Restaurant } from './models/restaurant';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    logging: false,
  }
);

// Initialize all models 
export function initializeModels(): void {
  initRestaurantModel(sequelize);
}

export { sequelize, Restaurant };
