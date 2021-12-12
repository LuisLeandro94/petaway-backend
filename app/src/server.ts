import app from './app';
import { sequelize } from '~models';

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, async () => {
	console.log(`API is running in port ${PORT}`);

	sequelize
		.authenticate()
		.then(() => console.log('Database connected...'))
		.catch((err) => console.log(`Error: ${err}`));
});
