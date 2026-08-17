import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const MainInfoPartPage = () => {
	return (
		<>
			<Helmet>
				<title>Страницы раздела «Информация»</title>
			</Helmet>
			<Outlet />
		</>
	)
}
