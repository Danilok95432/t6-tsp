import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'surname',
		placeholder: 'искать по названию пункта',
		type: 'text',
	},
	{
		name: 'types',
		placeholder: 'все типы',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
