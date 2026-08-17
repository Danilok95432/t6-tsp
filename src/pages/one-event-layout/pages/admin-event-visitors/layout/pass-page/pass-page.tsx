import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const PassPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Проходы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
