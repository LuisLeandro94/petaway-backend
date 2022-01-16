// #region Validations
const EVENT_VALIDATOR = {
	ADD_EVENT: [
		{
			paramKey: 'walkerId',
			required: true,
			type: 'number',
		},
		{
			paramKey: 'serviceId',
			required: true,
			type: 'number',
		},
		{
			paramKey: 'petId',
			required: true,
			type: 'number',
		},
		{
			paramKey: 'date',
			required: true,
			type: 'string',
		}
	],
	GET_EVENT: [
		{
			paramKey: 'walkerId',
			required: true,
			type: 'number',
		}
	],
	EDIT_EVENT: [
		{
			paramKey: 'eventId',
			required: true,
			type: 'number',
		},
		{
			paramKey: 'status',
			required: true,
			type: 'number',
		}
	]
};
// #endregion Validations

export default EVENT_VALIDATOR;
