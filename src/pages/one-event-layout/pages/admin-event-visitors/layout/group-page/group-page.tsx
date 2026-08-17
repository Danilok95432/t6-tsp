import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const GroupPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Группы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
