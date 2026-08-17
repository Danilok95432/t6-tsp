import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const GatesPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Ворота и инспекторы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
