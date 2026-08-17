import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const CiclesList = () => {
	return (
		<>
			<Helmet>
				<title>Циклы событий</title>
			</Helmet>
			<Outlet />
		</>
	)
}
