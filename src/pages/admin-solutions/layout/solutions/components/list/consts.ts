import { type FilterTableInput } from 'src/types/global'

export const TypeElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по названию...',
		type: 'text',
	},
	{
		name: 'sum-ot',
		placeholder: 'сумма от',
		type: 'text',
	},
	{
		name: 'sum-do',
		placeholder: 'до',
		type: 'text',
	},
	{
		name: 'category',
		placeholder: 'искать по категории...',
		type: 'text',
	},
	{
		name: 'levels',
		placeholder: 'уровни',
		type: 'select',
	},
]
