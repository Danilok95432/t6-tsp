import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const TypeGroupsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Виды групп</title>
			</Helmet>
			<Outlet />
		</>
	)
}
