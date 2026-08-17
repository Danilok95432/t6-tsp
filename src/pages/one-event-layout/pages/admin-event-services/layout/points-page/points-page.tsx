import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const PointsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Пункты оказания</title>
			</Helmet>
			<Outlet />
		</>
	)
}
