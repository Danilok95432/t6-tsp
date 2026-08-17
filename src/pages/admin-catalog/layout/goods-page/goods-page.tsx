import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const GoodsPage = () => {
	return (
		<>
			<Helmet>
				<title>Товары</title>
			</Helmet>
			<Outlet />
		</>
	)
}
