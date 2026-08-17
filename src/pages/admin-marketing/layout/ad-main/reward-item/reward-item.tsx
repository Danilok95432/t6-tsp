import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export const RewardPage = () => {
	return (
		<>
			<Helmet>
				<title>Награды</title>
			</Helmet>
			<Outlet />
		</>
	)
}
