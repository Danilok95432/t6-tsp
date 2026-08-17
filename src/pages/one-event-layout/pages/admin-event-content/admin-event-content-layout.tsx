import { Outlet, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import type { TabNavigationItem } from 'src/types/navigation'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const AdminEventContentLayout = () => {
	const { id = '' } = useParams()
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Контент',
			link: `/contest/contest-content/${id}/content`,
		},
		{
			title: 'Партнеры',
			link: `/contest/contest-content/${id}/contest-partners`,
		},
		{
			title: 'Правила',
			link: `/contest/contest-content/${id}/contest-rules`,
		},
		{
			title: 'Программа',
			link: `/contest/contest-content/${id}/contest-program/${id}`,
		},
	]

	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
				<div className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>Контент</h2>
						<TabNavigation variant='visitors' navItems={eventTabs} />
					</div>
				</div>
			</Container>
			<Outlet />
		</AdminContent>
	)
}
