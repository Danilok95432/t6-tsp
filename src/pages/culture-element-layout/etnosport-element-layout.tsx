import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { Outlet, useParams } from 'react-router-dom'
import type { TabNavigationItem } from 'src/types/navigation'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const EtnosportElementLayout = () => {
	const { id } = useParams()
	const etnoTabs: TabNavigationItem[] = [
		{
			title: 'Информация',
			link: `/etnosport/etnosport-info/${id ?? 'new'}`,
		},
		{
			title: 'Правила',
			link: `/etnosport/etnosport-rules/${id ?? 'new'}`,
		},
	]
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Один вид этноспорта</h1>
				<TabNavigation navItems={etnoTabs} />
			</div>
			<Outlet />
		</>
	)
}
