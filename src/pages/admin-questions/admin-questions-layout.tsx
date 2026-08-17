import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const AdminQuestionsLayout: FC = () => {
	return (
		<>
			<Helmet>
				<title>Частые вопросы</title>
			</Helmet>
			<div className={adminStyles.adminTitleTab}>
				<h1>Частые вопросы</h1>
			</div>
			<Outlet />
		</>
	)
}
