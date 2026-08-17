import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const SalesPage = () => {
	return (
		<>
			<Helmet>
				<title>Продажи</title>
			</Helmet>
			<Outlet />
		</>
	)
}
