import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '~v1/services';
import { RedisClient } from '~config';
import ResponseHandler from './response-handler';

const redisClient: RedisClient = new RedisClient();
const userService: UserService = new UserService();

class JWT {
	verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const jwtTokenCached = JSON.parse(await redisClient.get(token));

			if (!token) return res.status(401).json(new ResponseHandler(false, 401, 'No token provided.'));
			
			if (!jwtTokenCached){
				return res.status(401).json(new ResponseHandler(false, 401, 'Failed to authenticate token.'));
			}

			jwt.verify(token, jwtTokenCached.jwt_signature, (err, decoded) => {
				if (err) return res.status(401).json(new ResponseHandler(false, 401, 'Failed to authenticate token.'));
				req.user_id = decoded.userId;
				next();
			});
		} catch (error) /* istanbul ignore next */  {
			return res.status(401).json(new ResponseHandler(false, 401, 'Failed to authenticate token.'));
		}
	};
}

export default JWT;
