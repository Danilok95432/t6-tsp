import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { orgTabs } from './consts'

export const AdminOrgLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Организатор</h1>
				<TabNavigation navItems={orgTabs} />
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Outlet />
			</AdminContent>
		</>
	)
}
