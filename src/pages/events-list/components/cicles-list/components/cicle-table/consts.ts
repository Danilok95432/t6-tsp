import { type FilterTableInput } from 'src/types/global'

export const CiclesElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'dateStart',
		placeholder: 'актуальность',
		type: 'select',
		options: [{ label: 'актуальность', value: '0' }],
	},
	{
		name: 'dateEnd',
		placeholder: 'тип события',
		type: 'select',
		options: [{ label: 'тип события', value: '0' }],
	},
	{
		name: 'location',
		placeholder: 'регион проведения',
		type: 'text',
	},
]
