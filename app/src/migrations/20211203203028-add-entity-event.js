module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('events', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			walkerId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			resourceId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			petId: {
				type: Sequelize.STRING,
				allowNull: false
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			date: {
				type: Sequelize.DATE,
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
		return queryInterface.dropTable('events');
	}
};
