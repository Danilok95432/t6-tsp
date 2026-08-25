import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const SolCategoriesPage = () => {
	return (
		<>
			<Helmet>
				<title>Категории решений</title>
			</Helmet>
			<Outlet />
		</>
	)
}
