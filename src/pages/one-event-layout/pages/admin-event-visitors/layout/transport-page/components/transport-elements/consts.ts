import { type FilterTableInput } from 'src/types/global'

export const TransportFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по фамилии владельца...',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по госномеру...',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по номеру телефона...',
		type: 'text',
	},
	{
		name: 'turniket',
		placeholder: 'все типы',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
	{
		name: 'turniket',
		placeholder: 'все стоянки',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
