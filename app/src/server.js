import bodyParser from 'body-parser';
import app from './app.js';
import db from '~models/index.js';

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen({ port: PORT }, async () => {
  console.log(`API is running in port ${PORT}`);

  db.sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(`Error: ${err}`));
});
