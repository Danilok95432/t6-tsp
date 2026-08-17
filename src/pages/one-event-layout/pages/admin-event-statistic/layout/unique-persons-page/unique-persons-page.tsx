import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const UniquePersonsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Уникальные персоны</title>
			</Helmet>
			<Outlet />
		</>
	)
}
