import { Request, Response, NextFunction } from 'express';
import ResponseHandler from './response-handler';

export default class ParamsHandler {
	validateParams = (requestParams: any) => (req: Request, res: Response, next: NextFunction) => {
		if (req.method === 'GET') {
			if (Object.keys(req.query).length === 0) {
				req.query = req.params;
			}
		}
		for (const param of requestParams) {
			if (this.checkParamPresent(Object.keys(req.method === 'GET' ? req.query : req.body), param)) {
				let reqParam = req.body[param.paramKey];
				if (req.method === 'GET') {
					reqParam = req.query[param.paramKey];
				}
				if (req.method !== 'GET') {
					if (!this.checkParamType(reqParam, param)) {
						return res
							.status(400)
							.json(
								new ResponseHandler(
									false,
									400,
									`${param.paramKey} is of type ` + `${typeof reqParam} but should be ${param.type}`
								)
							);
					}
				}

				let isValid = false;
				try {
					isValid = this.runValidators(reqParam, param);
				} catch (error) {
					isValid = false;
				}
				if (!isValid) {
					return res.status(400).json(new ResponseHandler(false, 400, `Validation failed for ${param.paramKey}`));
				}
			} else if (param.required) {
				return res.status(400).json(new ResponseHandler(false, 400, `Missing Parameter ${param.paramKey}`));
			}
		}
		next();
	};

	checkParamPresent = (reqParams: any, paramObj: any) => reqParams.includes(paramObj.paramKey);

	checkParamType = (reqParam: any, paramObj: any) => {
		const reqParamType = typeof reqParam;
		return reqParamType === paramObj.type;
	};

	runValidators = (reqParam: any, paramObj: any) => {
		try {
			if (paramObj.validatorFunctions !== undefined) {
				for (const validator of paramObj.validatorFunctions) {
					if (!validator(reqParam)) {
						return false;
					}
				}
			}
			return true;
		} catch (err) {
			return false;
		}
	};
}
