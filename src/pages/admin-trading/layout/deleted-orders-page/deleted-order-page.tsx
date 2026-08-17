import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const DeletedOrdersPage = () => {
	return (
		<>
			<Helmet>
				<title>Удаленные заказы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
