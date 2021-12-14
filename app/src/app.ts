import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRoute, UserRoute } from '~v1/routes';

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send();
});

app.use('/v1', AuthRoute);
app.use('/v1', UserRoute);

app.use((err, req, res, next) => {
	const { name, message, stack } = err;
	if (name === 'validationError') res.status(400).json({ error: message });
	else res.status(500).json({ name, message, stack });
	next(err);
});

export default app;
