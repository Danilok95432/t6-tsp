import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по названию...',
		type: 'text',
	},
	{
		name: 'use_theme',
		placeholder: 'тема обращения',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'use_hurry',
		placeholder: 'срочность',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'use_status',
		placeholder: 'статус',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
