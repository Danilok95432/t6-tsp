import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const AllCustomersPage = () => {
	return (
		<>
			<Helmet>
				<title>Все покупатели</title>
			</Helmet>
			<Outlet />
		</>
	)
}
