// #region Validations
const AUTH_VALIDATOR = {
	SIGNUP: [
		{
			paramKey: 'email',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0 ]
		},
		{
			paramKey: 'password',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'firstName',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0 ]
		},
		{
			paramKey: 'lastName',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'postalCode',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	LOGIN: [
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
			validatorFunctions: [(param) => param.length > 0]
		}
	]
};
// #endregion Validations

export default AUTH_VALIDATOR;
