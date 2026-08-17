import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const PurchasedTicketsPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Купленные билеты</title>
			</Helmet>
			<Outlet />
		</>
	)
}
