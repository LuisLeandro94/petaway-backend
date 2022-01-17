// #region Validations
const WALKER_VALIDATOR = {
	GET_BY_ID: [
		{
			paramKey: 'userId',
			required: true,
			type: 'number',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	ADD_WALKER: [
		{
			paramKey: 'services',
			required: true,
			type: 'object',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'pets',
			required: true,
			type: 'object',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	GET_ALL_WALKER: [
		{
			paramKey: 'services',
			required: true,
			type: 'object',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'pets',
			required: true,
			type: 'object',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'city',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	
};
// #endregion Validations

export default WALKER_VALIDATOR;
