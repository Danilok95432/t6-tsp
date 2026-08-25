import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const SolutionsPage = () => {
	return (
		<>
			<Helmet>
				<title>Решения</title>
			</Helmet>
			<Outlet />
		</>
	)
}
