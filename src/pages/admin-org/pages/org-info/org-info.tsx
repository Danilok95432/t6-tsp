import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const OrgInfo = () => {
	return (
		<>
			<Helmet>
				<title>Сводка</title>
			</Helmet>
			<Outlet />
		</>
	)
}
