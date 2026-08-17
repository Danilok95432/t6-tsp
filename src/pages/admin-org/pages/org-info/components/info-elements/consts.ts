import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'name',
		placeholder: 'искать по названию...',
		type: 'text',
	},
	{
		name: 'type',
		placeholder: 'все документы',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
