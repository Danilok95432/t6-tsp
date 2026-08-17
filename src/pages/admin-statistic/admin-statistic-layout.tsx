import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const AdminStatisticLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Статистика</h1>
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Outlet />
			</AdminContent>
		</>
	)
}
