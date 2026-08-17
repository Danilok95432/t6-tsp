import { Outlet } from 'react-router-dom'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { communityTabs } from 'src/pages/community-layout/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const CommunityLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>О премии</h1>
				<TabNavigation navItems={communityTabs} />
			</div>
			<Outlet />
		</>
	)
}
