import { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { useGetEventInfoQuery } from 'src/store/events/events.api'
import type { TabNavigationItem } from 'src/types/navigation'

export const OneEventLayout = () => {
	const { id = '' } = useParams()
	const { data: eventInfoData } = useGetEventInfoQuery(id)
	const location = useLocation()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Профиль события',
			link: `/contest/contest-profile/${id ?? 'new'}`,
		},
		{
			title: 'Настройка',
			link: `/contest/contest-settings/${id ?? 'new'}`,
			indexLink: `/contest/contest-settings/${id}/registration`,
		},
		{
			title: 'Контент',
			link: `/contest/contest-content/${id ?? 'new'}`,
			indexLink: `/contest/contest-content/${id}/content`,
		},
		{
			title: 'Пропуск',
			link: `/contest/contest-pass/${id ?? 'new'}`,
			indexLink: `/contest/contest-pass/${id}`,
		},
		{
			title: 'Списки и статистика',
			link: `/contest/contest-lists/${id}`,
			indexLink: `/contest/contest-lists/${id}/registrations`,
		},
		{
			title: 'Размещение (публикация)',
			link: `/contest/contest-placement/${id}`,
			indexLink: `/contest/contest-placement/${id}`,
		},
	]
	const [isProgramPage, setIsProgramPage] = useState<boolean>(false)

	useEffect(() => {
		setIsProgramPage(location.pathname.includes('/one-program'))
	}, [location.pathname])
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				{!isProgramPage ? (
					<h1>{eventInfoData?.title !== '' ? eventInfoData?.title : 'Новое событие'}</h1>
				) : (
					<h1>Подсобытие</h1>
				)}
				{!isProgramPage && <TabNavigation navItems={eventTabs} />}
			</div>
			<Outlet />
		</>
	)
}
