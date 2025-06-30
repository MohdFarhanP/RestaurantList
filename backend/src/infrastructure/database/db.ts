import { Sequelize } from 'sequelize';
import { initRestaurantModel, Restaurant } from './models/restaurant';
import dotenv from 'dotenv';
dotenv.config();


let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // For production
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // For local development
  sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
      host: process.env.DB_HOST!,
      dialect: 'postgres',
      logging: false,
    }
  );
}

// Initialize all models 
export function initializeModels(): void {
  initRestaurantModel(sequelize);
}

export { sequelize, Restaurant };
