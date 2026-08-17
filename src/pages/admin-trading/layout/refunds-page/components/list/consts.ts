import { type FilterTableInput } from 'src/types/global'

export const RefundsElementsFiltrationInputs: FilterTableInput[] = [
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
		name: 'dateRefund',
		placeholder: 'дата и время возврата',
		type: 'date',
	},
]
