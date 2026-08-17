import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const ReviewsPage = () => {
	return (
		<>
			<Helmet>
				<title>Отзывы</title>
			</Helmet>
			<Outlet />
		</>
	)
}
