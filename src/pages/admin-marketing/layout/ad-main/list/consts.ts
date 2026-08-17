import { AdminRoute } from 'src/routes/admin-routes/consts'

export type AdBlockType = {
	id: string
	title: string
	link: string
}

export const AdBlocks: AdBlockType[] = [
	{
		id: '1',
		title: 'Блок «Промо» (главное изображение с надписью)',
		link: `${AdminRoute.AdPromo}`,
	},
	{
		id: '2',
		title: 'Блок «Награды»',
		link: `${AdminRoute.AdReward}`,
	},
	{
		id: '3',
		title: 'Блок  «Реклама»',
		link: `${AdminRoute.AdReklama}`,
	},
]
