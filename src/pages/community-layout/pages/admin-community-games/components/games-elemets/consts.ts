import { type FilterTableInput } from 'src/types/global'

export const GameElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'createdate',
		placeholder: 'размещено',
		type: 'date',
	},
]
