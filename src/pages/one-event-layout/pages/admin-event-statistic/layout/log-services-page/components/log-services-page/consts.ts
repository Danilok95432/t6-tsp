import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'surname',
		placeholder: 'искать по фамилии персоны',
		type: 'text',
	},
	{
		name: 'telphone',
		placeholder: 'искать по номеру телефона',
		type: 'text',
	},
	{
		name: 'services',
		placeholder: 'все сервисы',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
	{
		name: 'status',
		placeholder: 'все статусы',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
