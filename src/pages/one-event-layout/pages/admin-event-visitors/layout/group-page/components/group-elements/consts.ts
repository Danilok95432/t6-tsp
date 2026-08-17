import { type FilterTableInput } from 'src/types/global'

export const GroupsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'phone',
		placeholder: 'искать по номеру телефона',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии посетителя...',
		type: 'text',
	},
	{
		name: 'turniket',
		placeholder: 'тип группы',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
