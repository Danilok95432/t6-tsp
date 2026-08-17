import { type FilterTableInput } from 'src/types/global'

export const BraceletFiltrationInputs: FilterTableInput[] = [
	{
		name: 'telphone',
		placeholder: 'искать по номеру телефона...',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии...',
		type: 'text',
	},
	{
		name: 'turniket',
		placeholder: 'выбрать роль',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
	{
		name: 'turniket',
		placeholder: 'выбрать статус',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
