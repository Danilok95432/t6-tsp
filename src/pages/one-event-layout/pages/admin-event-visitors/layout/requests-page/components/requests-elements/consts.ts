import { type FilterTableInput } from 'src/types/global'

export const RequestsVisitorFiltrationInputs: FilterTableInput[] = [
	{
		name: 'surname',
		placeholder: 'искать по фамилии и имени посетителя...',
		type: 'text',
	},
	{
		name: 'group',
		placeholder: 'искать по названию группы...',
		type: 'text',
	},
	{
		name: 'vid',
		placeholder: 'Вид',
		type: 'select',
		options: [{ label: 'Не выбран', value: '0' }],
	},
	{
		name: 'role_name',
		placeholder: 'тип участия',
		type: 'select',
		options: [
			{ label: 'Не выбран', value: '0' },
			{ label: 'Этноспорт', value: '2' },
			{ label: 'Фольклор', value: '4' },
			{ label: 'Мастера', value: '7' },
			{ label: 'Торговля', value: '8' },
			{ label: 'Волонтеры', value: '6' },
			{ label: 'Организаторы', value: '3' },
			{ label: 'Пресса', value: '5' },
		],
	},
	{
		name: 'region',
		placeholder: 'искать по региону...',
		type: 'text',
	},
]
