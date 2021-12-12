module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('walker_services', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			walkerId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			serviceId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('walker_services');
	}
};
