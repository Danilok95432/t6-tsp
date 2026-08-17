import { type FilterTableInput } from 'src/types/global'

export const TicketsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'telphone',
		placeholder: 'искать по номеру телефона...',
		type: 'text',
	},
	{
		name: 'surname',
		placeholder: 'искать по фамилии покупателя...',
		type: 'text',
	},
	{
		name: 'email',
		placeholder: 'искать по e-mail...',
		type: 'text',
	},
	{
		name: 'reg_type',
		placeholder: 'вид регистрации',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
	{
		name: 'deliver_type',
		placeholder: 'вид доставки',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
