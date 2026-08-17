import { type TabNavigationItem } from 'src/types/navigation'

export const TradingTabNavigation: TabNavigationItem[] = [
	{
		title: 'Заказы',
		link: '/trading/orders',
	},
	{
		title: 'Удаленные заказы',
		link: '/trading/deleted-orders',
	},
	{
		title: 'Продажи',
		link: '/trading/sale',
	},
	{
		title: 'Возвраты',
		link: '/trading/refunds',
	},
]
