import { type FilterTableInput } from 'src/types/global'

export const RequestsElementsFiltrationInputs: FilterTableInput[] = [
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
]
