import { type FilterTableInput } from 'src/types/global'

export const LocationsElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'publicity',
		placeholder: 'публичность',
		type: 'select',
		options: [{ label: 'публичность', value: '0' }],
	},
	{
		name: 'org',
		placeholder: 'организатор',
		type: 'text',
	},
	{
		name: 'region',
		placeholder: 'регион',
		type: 'text',
	},
	{
		name: 'status',
		placeholder: 'статус',
		type: 'select',
		options: [{ label: 'статус', value: '0' }],
	},
]
