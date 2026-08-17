import { type FilterTableInput } from 'src/types/global'

export const SalesElementsFiltrationInputs: FilterTableInput[] = [
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
		name: 'dateOrder',
		placeholder: 'дата и время заказа',
		type: 'date',
	},
	{
		name: 'dateSale',
		placeholder: 'дата и время продажи',
		type: 'date',
	},
]
