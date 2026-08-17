import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'ticket_number',
		placeholder: 'искать по номеру билета',
		type: 'text',
	},
	{
		name: 'email',
		placeholder: 'искать по e-mail',
		type: 'text',
	},
	{
		name: 'ticket_type',
		placeholder: 'вид билета',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'purchase_type',
		placeholder: 'вид покупки',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'status',
		placeholder: 'статус',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
