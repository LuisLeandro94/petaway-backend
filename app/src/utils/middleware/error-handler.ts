export default class ErrorHandler extends Error {
	code: number;

	constructor(message: string, code?: number) {
		super(message);
		this.code = code ? code : 500;
	}
}
