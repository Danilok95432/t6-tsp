import { Outlet, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import type { TabNavigationItem } from 'src/types/navigation'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const SettingsEventLayout = () => {
	const { id = '' } = useParams()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Регистрация',
			link: `/contest/contest-settings/${id}/registration`,
		},
		{
			title: 'Виды билетов',
			link: `/contest/contest-settings/${id}/tickets`,
		},
		{
			title: 'Оплата',
			link: `/contest/contest-settings/${id}/payments`,
		},
	]

	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
				<div className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>Настройка</h2>
						<TabNavigation variant='visitors' navItems={eventTabs} />
					</div>
				</div>
			</Container>
			<Outlet />
		</AdminContent>
	)
}
