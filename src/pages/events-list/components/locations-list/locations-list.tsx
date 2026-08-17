import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const LocationsList = () => {
	return (
		<>
			<Helmet>
				<title>Площадки</title>
			</Helmet>
			<Outlet />
		</>
	)
}
