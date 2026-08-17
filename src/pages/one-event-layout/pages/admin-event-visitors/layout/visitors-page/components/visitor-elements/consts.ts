import { type FilterTableInput } from 'src/types/global'

export const VisitorFiltrationInputs: FilterTableInput[] = [
	{
		name: 'phone',
		placeholder: 'искать по номеру телефона',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии и имени',
		type: 'text',
	},
	{
		name: 'region',
		placeholder: 'искать по региону',
		type: 'text',
	},
	{
		name: 'status',
		placeholder: 'выбрать роль',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
]
