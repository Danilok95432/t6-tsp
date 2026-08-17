import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'date',
		placeholder: 'дд.мм.гггг — дд.мм.гггг',
		type: 'date-range',
	},
	{
		name: 'name',
		placeholder: 'искать по названию события...',
		type: 'text',
	},
	{
		name: 'number-range',
		placeholder: '',
		type: 'number-range',
	},
]
