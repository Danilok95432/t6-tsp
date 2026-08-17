import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const OrdersPage = () => {
	return (
		<>
			<Helmet>
				<title>Заказы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
