import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const RegularCustomersPage = () => {
	return (
		<>
			<Helmet>
				<title>Постоянные покупатели</title>
			</Helmet>
			<Outlet />
		</>
	)
}
