import { type FilterTableInput } from 'src/types/global'

export const ObjectsElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по названию',
		type: 'text',
	},
	{
		name: 'type',
		placeholder: 'тип объекта',
		type: 'text',
	},
	{
		name: 'relation',
		placeholder: 'принадлежность',
		type: 'text',
	},
]
