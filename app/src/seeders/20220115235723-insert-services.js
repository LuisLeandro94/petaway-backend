'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'resources',
			[
				{
					type: 'Pet Walking',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				},
				{
					type: 'Pet Sitting',
					createdAt: '2022-01-12 10:51:17.6+00',
					updatedAt: '2022-01-12 10:51:17.6+00'
				}
			],
			{}
		);
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
