import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const EntersListPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Журнал проходов</title>
			</Helmet>
			<Outlet />
		</>
	)
}
