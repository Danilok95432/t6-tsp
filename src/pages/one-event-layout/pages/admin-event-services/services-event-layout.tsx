import { Outlet, useLocation, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import type { TabNavigationItem } from 'src/types/navigation'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const ServicesEventLayout = () => {
	const { id = '' } = useParams()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Список сервисов',
			link: `/event/event-services/${id}/list`,
		},
		{
			title: 'Оказание услуг',
			link: `/event/event-services/${id}/services`,
		},
		{
			title: 'Пункты оказания',
			link: `/event/event-services/${id}/points`,
		},
		{
			title: 'Получатели услуг',
			link: `/event/event-services/${id}/recipients`,
		},
	]

	const getTitle = (): string => {
		const location = useLocation()
		const lastPath: string = location.pathname.split('/')[location.pathname.split('/').length - 1]
		return eventTabs.find((el) => el.link.includes(lastPath))?.title ?? ''
	}

	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
				<div className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>{getTitle()}</h2>
						<TabNavigation variant='visitors' navItems={eventTabs} />
					</div>
				</div>
			</Container>
			<Outlet />
		</AdminContent>
	)
}
