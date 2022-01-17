import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRoute, UserRoute, ResourceRoute, PetRoute, WalkerRoute, EventRoute } from '~v1/routes';
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
app.use('/v1', new JWT().verifyJWT, EventRoute);

export default app;
