import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const LogPaymentsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Лог оплат</title>
			</Helmet>
			<Outlet />
		</>
	)
}
