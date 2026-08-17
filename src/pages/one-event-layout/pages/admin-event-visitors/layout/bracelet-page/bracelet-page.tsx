import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const BraceletPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Браслеты</title>
			</Helmet>
			<Outlet />
		</>
	)
}
