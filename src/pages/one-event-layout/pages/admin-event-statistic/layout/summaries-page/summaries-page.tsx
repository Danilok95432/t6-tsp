import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const SummariesPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Сводки</title>
			</Helmet>
			<Outlet />
		</>
	)
}
