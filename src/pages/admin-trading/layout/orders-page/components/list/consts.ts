import { type FilterTableInput } from 'src/types/global'

export const OrderElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'source',
		placeholder: 'искать по источнику...',
		type: 'text',
	},
	{
		name: 'customer',
		placeholder: 'искать по заказчику...',
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
