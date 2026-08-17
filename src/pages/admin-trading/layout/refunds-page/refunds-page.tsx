import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const RefundsPage = () => {
	return (
		<>
			<Helmet>
				<title>Возвраты</title>
			</Helmet>
			<Outlet />
		</>
	)
}
