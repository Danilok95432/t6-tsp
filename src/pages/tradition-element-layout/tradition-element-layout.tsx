import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { Outlet, useParams } from 'react-router-dom'
import type { TabNavigationItem } from 'src/types/navigation'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const TraditionElementLayout = () => {
	const { id } = useParams()
	const traditionTabs: TabNavigationItem[] = [
		{
			title: 'Информация',
			link: `/tradition/tradition-info/${id ?? 'new'}`,
		},
		{
			title: 'История',
			link: `/tradition/tradition-history/${id ?? 'new'}`,
		},
	]
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Одна традиция</h1>
				<TabNavigation navItems={traditionTabs} />
			</div>
			<Outlet />
		</>
	)
}
