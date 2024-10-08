'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('urls', 'shortId', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('urls', 'shortId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    });
  }
};
