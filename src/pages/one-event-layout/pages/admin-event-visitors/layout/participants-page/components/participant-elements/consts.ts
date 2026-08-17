import { type FilterTableInput } from 'src/types/global'

export const VisitorFiltrationInputs: FilterTableInput[] = [
	{
		name: 'phone',
		placeholder: 'искать по номеру телефона',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии',
		type: 'text',
	},
	{
		name: 'region',
		placeholder: 'искать по региону',
		type: 'text',
	},
	{
		name: 'vid',
		placeholder: 'выбрать вид',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
	{
		name: 'group',
		placeholder: 'искать по названию группы',
		type: 'text',
	},
]
