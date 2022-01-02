// #region Validations
const RESOURCE_VALIDATOR = {
	GET_BY_ID: [
		{
			paramKey: 'id',
			required: true,
			type: 'number',
			validatorFunctions: [(param) => param.length > 0 ]
		},
	],
};
// #endregion Validations

export default RESOURCE_VALIDATOR;
