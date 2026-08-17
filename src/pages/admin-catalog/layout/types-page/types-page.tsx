import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const TypesPage = () => {
	return (
		<>
			<Helmet>
				<title>Типы товаров</title>
			</Helmet>
			<Outlet />
		</>
	)
}
