import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRoute, UserRoute, ResourceRoute, PetRoute, WalkerRoute } from '~v1/routes';
import JWT from '~utils/middleware/passport';

const app = express();

declare global {
	namespace Express {
		interface Request {
			user_id?: any;
		}
	}
}
// Cors
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send();
});

app.use('/v1', AuthRoute);
app.use('/v1', new JWT().verifyJWT, UserRoute);
app.use('/v1', new JWT().verifyJWT, ResourceRoute);
app.use('/v1', new JWT().verifyJWT, PetRoute);
app.use('/v1', new JWT().verifyJWT, WalkerRoute);

app.use((err, req, res, next) => {
	const { name, message, stack } = err;
	if (name === 'validationError') res.status(400).json({ error: message });
	else res.status(500).json({ name, message, stack });
	next(err);
});

export default app;
