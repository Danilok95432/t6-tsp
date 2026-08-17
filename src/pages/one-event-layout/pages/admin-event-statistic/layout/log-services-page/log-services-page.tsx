import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const LogServicesPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Лог сервисов</title>
			</Helmet>
			<Outlet />
		</>
	)
}
