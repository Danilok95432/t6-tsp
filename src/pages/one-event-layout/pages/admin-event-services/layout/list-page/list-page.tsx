import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const ListPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Список сервисов</title>
			</Helmet>
			<Outlet />
		</>
	)
}
