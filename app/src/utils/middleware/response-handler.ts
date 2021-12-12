export default class ResponseHandler {
	success: boolean;

	code: number;

	result: any;

	constructor(success: boolean, code: number, result: any) {
		this.success = success;
		this.code = code;
		this.result = result;
	}
}
