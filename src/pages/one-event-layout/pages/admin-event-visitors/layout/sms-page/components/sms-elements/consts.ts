import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'phone',
		placeholder: 'искать по телефону получателя...',
		type: 'text',
	},
	{
		name: 'operator',
		placeholder: 'оператор получателя',
		type: 'select',
		options: [
			{ label: 'Оператор 1', value: '0' },
			{ label: 'Оператор 2', value: '1' },
		],
	},
	{
		name: 'sms_type',
		placeholder: 'тип сообщения',
		type: 'select',
		options: [
			{ label: 'Тип сообщения 1', value: '0' },
			{ label: 'Тип сообщения 2', value: '1' },
		],
	},
	{
		name: 'status',
		placeholder: 'статус',
		type: 'select',
		options: [
			{ label: 'Статус 1', value: '0' },
			{ label: 'Статус 2', value: '1' },
		],
	},
]
