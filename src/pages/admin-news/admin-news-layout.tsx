import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { Outlet } from 'react-router-dom'
import { newsTabs } from 'src/pages/admin-news/consts'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const AdminNewsLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Новости</h1>
				<TabNavigation navItems={newsTabs} />
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Outlet />
			</AdminContent>
		</>
	)
}
