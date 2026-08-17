import { type TabNavigationItem } from 'src/types/navigation'

export const expressTabs: TabNavigationItem[] = [
	{
		title: 'Главное о событии',
		subtitle: 'Шаг 1',
		link: `express-main`,
	},
	{
		title: 'Информация',
		subtitle: 'Шаг 2',
		link: `express-info`,
		indexLink: `express-info`,
	},
	{
		title: 'Регистрация и билеты',
		subtitle: 'Шаг 3',
		link: `express-registration`,
		indexLink: `express-registration`,
	},
	{
		title: 'Турникеты и доступы',
		subtitle: 'Шаг 4',
		link: `express-passes`,
		indexLink: `express-passes`,
	},
	{
		title: 'Размещение события',
		subtitle: 'Шаг 5',
		link: `express-placement`,
		indexLink: `express-placement`,
	},
]
