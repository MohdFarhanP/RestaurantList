'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.addColumn('restaurant','images',{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    })
  },

  async down (queryInterface:QueryInterface) {
    queryInterface.removeColumn('restaurant','images');
  }
};
