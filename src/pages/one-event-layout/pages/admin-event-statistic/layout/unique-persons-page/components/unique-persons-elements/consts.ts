import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'surname',
		placeholder: 'искать по фамилии персоны',
		type: 'text',
	},
	{
		name: 'types',
		placeholder: 'все типы участия',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
