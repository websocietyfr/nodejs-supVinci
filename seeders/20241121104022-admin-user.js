'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: "Soufian",
          lastname: "AIT TIRITE",
          email: "s.aittirite@websociety.fr"
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users')
  }
};
