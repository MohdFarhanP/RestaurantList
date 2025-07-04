import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface RestaurantAttributes {
  id: number;
  name: string;
  contact: string;
  email: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

export class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public contact!: string;
  public email!: string;
  public street!: string;
  public landmark!: string;
  public area!: string;
  public city!: string;
  public state!: string;
  public pincode!: string;
  public country!: string;

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
      email: DataTypes.STRING,
      street: DataTypes.STRING,
      landmark: DataTypes.STRING,
      area: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      pincode: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'restaurant',
    }
  );
}
