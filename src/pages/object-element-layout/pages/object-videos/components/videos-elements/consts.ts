import { type FilterTableInput } from 'src/types/global'

export const ObjectVideosFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по названию',
		type: 'text',
	},
	{
		name: 'tags',
		placeholder: 'искать по тегам',
		type: 'text',
	},
	{
		name: 'date',
		placeholder: 'дата',
		type: 'date',
	},
]
