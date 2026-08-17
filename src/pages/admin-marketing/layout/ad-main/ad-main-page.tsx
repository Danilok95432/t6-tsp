import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const AdMainPage = () => {
	return (
		<>
			<Helmet>
				<title>Реклама на главной</title>
			</Helmet>
			<Outlet />
		</>
	)
}
