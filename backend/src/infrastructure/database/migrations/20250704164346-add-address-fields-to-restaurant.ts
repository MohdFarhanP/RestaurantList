'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:QueryInterface) {

    await queryInterface.addColumn('restaurant','street',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','landmark',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','area',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','city',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','state',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','pincode',{
      type:DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurant','country',{
      type:DataTypes.STRING,
    });
  },

  async down (queryInterface:QueryInterface) {

    await queryInterface.removeColumn('restaurant','street');
    await queryInterface.removeColumn('restaurant','landmark');
    await queryInterface.removeColumn('restaurant','area');
    await queryInterface.removeColumn('restaurant','city');
    await queryInterface.removeColumn('restaurant','state');
    await queryInterface.removeColumn('restaurant','pincode');
    await queryInterface.removeColumn('restaurant','country');
  }
};
