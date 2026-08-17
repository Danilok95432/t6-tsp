import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const MakersPage = () => {
	return (
		<>
			<Helmet>
				<title>Производители</title>
			</Helmet>
			<Outlet />
		</>
	)
}
