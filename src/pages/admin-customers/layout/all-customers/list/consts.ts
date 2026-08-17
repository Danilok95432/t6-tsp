import { type FilterTableInput } from 'src/types/global'

export const CustomerElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'customer',
		placeholder: 'искать по покупателю...',
		type: 'text',
	},
	{
		name: 'phone',
		placeholder: 'телефон',
		type: 'text',
	},
	{
		name: 'date',
		placeholder: 'дата',
		type: 'date',
	},
]
