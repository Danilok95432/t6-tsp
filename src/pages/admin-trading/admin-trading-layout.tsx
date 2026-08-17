import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { TradingTabNavigation } from './consts'

export const AdminTradingLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Торговля</h1>
				<TabNavigation navItems={TradingTabNavigation} />
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Outlet />
			</AdminContent>
		</>
	)
}
