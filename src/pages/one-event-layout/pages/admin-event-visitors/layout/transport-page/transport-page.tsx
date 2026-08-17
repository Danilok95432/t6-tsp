import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const TransportPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Транспорт</title>
			</Helmet>
			<Outlet />
		</>
	)
}
