import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const DistributionPage = () => {
	return (
		<>
			<Helmet>
				<title>Рассылка</title>
			</Helmet>
			<h2 style={{ margin: '0 0 0 28px' }}>Рассылка</h2>
			<Outlet />
		</>
	)
}
