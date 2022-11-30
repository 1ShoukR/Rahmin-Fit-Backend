'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  await queryInterface.bulkInsert(
    'TypesOfServices',
    [
      {
        OneOnOneVirtualTraining: "1-on-1 Virtual Coaching",
        InPersonTraining: "In-Person Training",
        CustomBuiltTrainingPrograms: "Custon Built Training Programs",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TypesOfServices', null, {})
  }
};
