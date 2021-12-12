import { ErrorHandler } from '~utils/middleware';

export default abstract class Service {
	model: any;

	constructor(model: any) {
		this.model = model;
	}

	get = async (
		offset: number,
		limit: number,
		orderField: string,
		order: string,
		includes?: string[],
		predicate?: any,
		attributes?: string[]
	): Promise<any[]> => {
		try {
			const results = await this.model.findAll({
				includes: includes || '',
				where: predicate || {},
				offset,
				limit,
				order: [[orderField, order]],
				attributes
			});

			return results;
		} catch (err) {
			throw new ErrorHandler(err);
		}
	};

	getSingle = async (
		includes?: any[],
		predicate?: any,
		attributes?: string[],
		excludeAttributes?: string[]
	): Promise<any> => {
		try {
			const result = await this.model.findOne({
				includes: includes || [],
				where: predicate || {},
				attributes: { exclude: excludeAttributes, attributes }
			});

			return result;
		} catch (err) {
			throw new ErrorHandler(err);
		}
	};

	any = async (predicate: any): Promise<boolean> => {
		try {
			const result = await this.model.count({
				where: predicate || {}
			});
			let exist = false;
			if (result > 0) {
				exist = true;
			}
			return exist;
		} catch (err) {
			throw new ErrorHandler(err);
		}
	};

	save = async (model: any): Promise<any> => {
		try {
			const result = await model.save();
			return result;
		} catch (err) {
			throw new ErrorHandler(err);
		}
	};

	delete = async (predicate: any): Promise<any> => {
		try {
			const result = await this.model.update(
				{
					isDeleted: true
				},
				{
					where: predicate || {}
				}
			);
			return result;
		} catch (err) {
			throw new ErrorHandler(err);
		}
	};
}