import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const LevelsPage = () => {
	return (
		<>
			<Helmet>
				<title>Уровни решений</title>
			</Helmet>
			<Outlet />
		</>
	)
}
