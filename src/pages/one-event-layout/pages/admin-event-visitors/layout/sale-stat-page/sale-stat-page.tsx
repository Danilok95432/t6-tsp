import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const SaleStatPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Сводка продаж</title>
			</Helmet>
			<Outlet />
		</>
	)
}
