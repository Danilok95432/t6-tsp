import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { CatalogTabNavigation } from './consts'

export const AdminCatalogLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Каталог</h1>
				<TabNavigation navItems={CatalogTabNavigation} />
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Outlet />
			</AdminContent>
		</>
	)
}
