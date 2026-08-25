import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const ProjectsPage = () => {
	return (
		<>
			<Helmet>
				<title>Реализация(проекты)</title>
			</Helmet>
			<Outlet />
		</>
	)
}
