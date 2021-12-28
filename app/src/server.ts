import app from './app';
import { sequelize } from '~models';
import Relations from '~models/relations';

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, async () => {
	console.log(`API is running in port ${PORT}`);

	sequelize
		.authenticate()
		.then(async () => {
			console.log('Database connected...');
			new Relations().defineRelations();
		})
		.catch((err) => console.log(`Error: ${err}`));
});
