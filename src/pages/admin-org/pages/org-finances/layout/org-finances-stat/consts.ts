import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'use_sort',
		placeholder: 'по событиям',
		type: 'select',
		label: 'Выборка',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'use_event',
		placeholder: 'Атмановские кулачки 2025',
		type: 'select',
		label: 'События',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'use_period',
		placeholder: 'За неделю',
		type: 'select',
		label: 'Период',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
