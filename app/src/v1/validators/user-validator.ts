// #region Validations
const USER_VALIDATOR = {
	EDIT: [
		{
			paramKey: 'firstName',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'lastName',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'address_1',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'address_2',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'city',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'state',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'zip',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'country',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},

		{
			paramKey: 'profilePhoto',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'birthdate',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		},
		{
			paramKey: 'phoneNumber',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		}
	],
	EDIT_PASSWORD: [
		{
			paramKey: 'password',
			required: true,
			type: 'string',
			validatorFunctions: [(param) => param.length > 0]
		}
	]
};
// #endregion Validations

export default USER_VALIDATOR;
