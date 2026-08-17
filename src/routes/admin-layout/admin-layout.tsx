import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { isAuthUser } from 'src/store/auth/auth.selectors'

import { Container } from 'src/UI/Container/Container'
import { AdminFooter } from 'src/components/admin-footer/admin-footer'
import { AdminHeader } from 'src/modules/admin-header/admin-header'
import { AdminNavigation } from 'src/modules/admin-navigation/admin-navigation'

import styles from './index.module.scss'

export const AdminLayout: FC = () => {
	const isAuth = useSelector(isAuthUser)
	return (
		<>
			<Helmet>
				<title>Админка</title>
			</Helmet>
			{isAuth && <AdminHeader />}
			<main className={styles.adminMain}>
				<Container className={styles.adminInner} $padding='31px 30px 0'>
					{isAuth && <AdminNavigation />}
					<div className={styles.contentWrapper}>
						<Outlet />
					</div>
				</Container>
			</main>

			<AdminFooter />
		</>
	)
}
