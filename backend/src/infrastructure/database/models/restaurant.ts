import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface RestaurantAttributes {
  id: number;
  name: string;
  contact: string;
  address: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

export class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public contact!: string;
  public address!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initRestaurantModel(sequelize: Sequelize) {
  Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      contact: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'restaurant',
    }
  );
}
