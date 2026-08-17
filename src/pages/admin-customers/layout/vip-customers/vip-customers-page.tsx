import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const VIPCustomersPage = () => {
	return (
		<>
			<Helmet>
				<title>VIP-персоны</title>
			</Helmet>
			<Outlet />
		</>
	)
}
