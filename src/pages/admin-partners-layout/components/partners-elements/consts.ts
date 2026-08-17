import { type FilterTableInput } from 'src/types/global'

export const PartnerElementsFiltrationInputs: FilterTableInput[] = [
	{
		name: 'title',
		placeholder: 'искать по наименованию',
		type: 'text',
	},
	{
		name: 'partner_vids',
		placeholder: 'искать по виду организации',
		type: 'text',
	},
	{
		name: 'partner_types',
		placeholder: 'искать по типу партнерства',
		type: 'text',
	},
]
