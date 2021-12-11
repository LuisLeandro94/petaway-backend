import app from './app';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from '~models';

const PORT = process.env.PORT || 5000;

// Cors
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen({ port: PORT }, async () => {
  console.log(`API is running in port ${PORT}`);

  sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(`Error: ${err}`));
});
