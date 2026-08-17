import { type NavigationItem } from 'src/types/navigation'
import { AdminSupportIconSvg } from 'src/UI/icons/adminSupportIconSVG'
import { AdminSettingsIconSvg } from 'src/UI/icons/adminSettingsIconSVG'
// import { AdminAboutIconSvg } from 'src/UI/icons/adminFederationIconSVG'
import { AdminPartnersIconSvg } from 'src/UI/icons/adminPartnersIconSvg'
// import { AdminQuestionsIcon } from 'src/UI/icons/adminQuestionsIcon'
import { AdminOrgIconSVG } from 'src/UI/icons/adminOrgIncoSVG'
import { AdminGuestsIconSVG } from 'src/UI/icons/adminGuestsIconSVG'
import { AdminStatisticIconSVG } from 'src/UI/icons/adminStatisticIconSVG'

export const adminMenuItems: NavigationItem[] = [
	{
		title: 'Каталог',
		icon: <AdminPartnersIconSvg />,
		link: 'catalog/types',
	},
	{
		title: 'Торговля',
		icon: <AdminOrgIconSVG />,
		link: 'trading/orders',
	},
	{
		title: 'Покупатели',
		icon: <AdminGuestsIconSVG />,
		link: 'customers/all',
	},
	{
		title: 'Маркетинг',
		icon: <AdminStatisticIconSVG />,
		link: 'marketing/ad',
	},
	// {
	// 	title: 'Частые вопросы',
	// 	icon: <AdminQuestionsIcon />,
	// 	link: 'frequent-questions',
	// },
	{
		title: 'Поддержка',
		link: 'support',
		icon: <AdminSupportIconSvg />,
	},
	{
		title: 'Настройки сайта',
		link: 'admin-settings',
		icon: <AdminSettingsIconSvg />,
	},
]
