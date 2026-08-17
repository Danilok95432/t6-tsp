import { type FilterTableInput } from 'src/types/global'

export const MakerElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию...',
		type: 'text',
	},
	{
		name: 'country',
		placeholder: 'искать по стране...',
		type: 'text',
	},
	{
		name: 'urlMaker',
		placeholder: 'искать по ссылке...',
		type: 'text',
	},
	{
		name: 'types',
		placeholder: 'все типы',
		type: 'select',
		options: [
			{ label: 'Одиночный', value: '0' },
			{ label: 'Групповой', value: '1' },
		],
	},
]
