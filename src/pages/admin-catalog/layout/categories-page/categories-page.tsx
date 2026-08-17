import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const CategoriesPage = () => {
	return (
		<>
			<Helmet>
				<title>Категории</title>
			</Helmet>
			<Outlet />
		</>
	)
}
