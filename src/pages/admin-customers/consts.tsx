import { type TabNavigationItem } from 'src/types/navigation'

export const CustomersTabNavigation: TabNavigationItem[] = [
	{
		title: 'Все',
		link: '/customers/all',
	},
	{
		title: 'Постоянные',
		link: '/customers/regular',
	},
	// {
	// 	title: 'VIP-персоны',
	// 	link: '/customers/vip',
	// 	icon: <VipIconSVG />,
	// },
]
