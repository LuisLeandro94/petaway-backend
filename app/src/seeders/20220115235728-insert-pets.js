'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'pets',
			[
				{
					type: 'Dog',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				},
				{
					type: 'Cat',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				},
				{
					type: 'Wife',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				},
				{
					type: 'Shark',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				},
				{
					type: 'Turtle',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				}
			],
			{}
		);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
