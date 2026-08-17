import { type FilterTableInput } from 'src/types/global'

export const NewsElementsByEventIdFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'date',
		placeholder: 'дата',
		type: 'date',
	},
	{
		name: 'tags',
		placeholder: 'искать по тегам',
		type: 'text',
	},
]
