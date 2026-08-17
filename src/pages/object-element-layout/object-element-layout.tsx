import type { TabNavigationItem } from 'src/types/navigation'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { Outlet, useParams } from 'react-router-dom'

import { AdminRoute } from 'src/routes/admin-routes/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const ObjectElementLayout = () => {
	const { id } = useParams()
	const objectTabs: TabNavigationItem[] = [
		{
			title: 'Об объекте',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjInfo}/${id}`,
		},
		{
			title: 'Новости',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjNews}/${id}`,
		},
		/* {
			title: 'История',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjHistory}/${id}`,
		}, */
		{
			title: 'События',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjEvents}/${id}`,
		},
		{
			title: 'Галерея',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjGallery}/${id}`,
		},
		{
			title: 'Видеолента',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjVideos}/${id}`,
		},
		{
			title: 'Карта и маршруты',
			link: `/${AdminRoute.AdminObject}/${AdminRoute.AdminObjLocation}/${id}`,
		},
	]
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<h1>Объект кластера</h1>
				<TabNavigation navItems={objectTabs} />
			</div>
			<Outlet />
		</>
	)
}
