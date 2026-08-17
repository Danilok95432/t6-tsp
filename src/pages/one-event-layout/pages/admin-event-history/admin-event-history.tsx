import { type FC } from 'react'

import { AdminContent } from 'src/components/admin-content/admin-content'

import { Link } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const AdminEventHistory: FC = () => {
	return (
		<AdminContent className={styles.eventHistoryPage}>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку событий
			</Link>
			<h3>История</h3>
		</AdminContent>
	)
}
