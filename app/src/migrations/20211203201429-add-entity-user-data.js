module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('users_data', {
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
			firstName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			address_1: {
				type: Sequelize.STRING,
				allowNull: true
			},
			address_2: {
				type: Sequelize.STRING,
				allowNull: true
			},
			city: {
				type: Sequelize.STRING,
				allowNull: true
			},
			state: {
				type: Sequelize.STRING,
				allowNull: true
			},
			zip: {
				type: Sequelize.STRING,
				allowNull: true
			},
			country: {
				type: Sequelize.STRING,
				allowNull: true
			},
			profilePhoto: {
				type: Sequelize.STRING,
				allowNull: true
			},
			birthdate: {
				type: Sequelize.STRING,
				allowNull: true
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: true
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
		return queryInterface.dropTable('users_data');
	}
};
