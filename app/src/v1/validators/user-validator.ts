// #region Validations
const AUTH_VALIDATOR = {
	GET_BY_ID: [
		{
			paramKey: 'id',
			required: true,
			type: 'number',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	EDIT: [
		{
			paramKey: 'email',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'password',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 8]
		}
	],
	DELETE: [
		{
			paramKey: 'id',
			required: true,
			type: 'number',
			validatorFunctions: [(param) => param.length > 0]
		}
	]
};
// #endregion Validations

export default AUTH_VALIDATOR;
