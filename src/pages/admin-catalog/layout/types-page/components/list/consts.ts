import { type FilterTableInput } from 'src/types/global'

export const TypeElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'category',
		placeholder: 'искать по категории...',
		type: 'text',
	},
	{
		name: 'title',
		placeholder: 'искать по названию...',
		type: 'text',
	},
	{
		name: 'date',
		placeholder: 'дата',
		type: 'date',
	},
]
