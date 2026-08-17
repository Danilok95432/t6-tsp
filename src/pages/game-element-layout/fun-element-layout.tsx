import { Outlet, useParams } from 'react-router-dom'
import type { TabNavigationItem } from 'src/types/navigation'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const FunElementLayout = () => {
	const { id } = useParams()
	const gameTabs: TabNavigationItem[] = [
		{
			title: 'Информация',
			link: `/fun/fun-info/${id ?? 'new'}`,
		},
		{
			title: 'Правила',
			link: `/fun/fun-rules/${id ?? 'new'}`,
		},
	]
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Одна исконная забава</h1>
				<TabNavigation navItems={gameTabs} />
			</div>
			<Outlet />
		</>
	)
}
