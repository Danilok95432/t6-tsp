import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const InspectorsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>АПП и инспекторы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
