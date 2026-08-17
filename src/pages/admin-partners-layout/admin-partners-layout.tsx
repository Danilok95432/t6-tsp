import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const AdminPartnersLayout = () => {
	return (
		<>
			{' '}
			<Helmet>
				<title>Партнеры</title>
			</Helmet>
			<div className={adminStyles.adminTitleTab}>
				<h1>Партнеры</h1>
			</div>
			<AdminContent $padding='30px 0 35px 0' $backgroundColor='#ffffff'>
				<Outlet />
			</AdminContent>
		</>
	)
}
