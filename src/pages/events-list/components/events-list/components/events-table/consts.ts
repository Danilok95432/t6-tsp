import { type FilterTableInput } from 'src/types/global'

export const EventsElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'dateStart',
		placeholder: 'начало',
		type: 'date',
	},
	{
		name: 'dateEnd',
		placeholder: 'окончание',
		type: 'date',
	},
	{
		name: 'location',
		placeholder: 'место проведения',
		type: 'text',
	},
]
