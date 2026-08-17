import { Outlet, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import type { TabNavigationItem } from 'src/types/navigation'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { useGetAllLogsEnterQuery } from 'src/store/statistic/statistic.api'
import cn from 'classnames'

export const StatisticEventLayout = () => {
	const { id = '' } = useParams()
	const { data: statistic } = useGetAllLogsEnterQuery({ id, limit: 1 })
	const eventTabs: TabNavigationItem[] = [
		{
			title: 'Ворота и инспекторы',
			link: `/contest/contest-statistic/${id}/gates`,
		},
	]

	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
				{!location.pathname.includes('/inspectors/') &&
					!location.pathname.includes('/summaries/') && (
						<div
							className={cn(styles.headRow, {
								[styles.headRowPerson]: location.pathname.includes('/unique-persons'),
							})}
						>
							<div className={styles.adminTitleTab}>
								<h2>Пропуск</h2>
								<TabNavigation variant='visitors' navItems={eventTabs} />
							</div>
							{location.pathname.includes('/log-enters') && (
								<div className={styles.statBlock}>
									<div className={styles.leftSide}>
										<p>Куплено билетов, всего:</p>
										<p>Прошло посетителей:</p>
										<p>Всего неуникальных проходов:</p>
									</div>
									<div className={styles.rightSide}>
										<p>{statistic?.tickets_total}</p>
										<p>{statistic?.people_total}</p>
										<p>{statistic?.prohod_total}</p>
									</div>
								</div>
							)}
							{location.pathname.includes('/unique-persons') && (
								<div className={styles.statBlock}>
									<div className={styles.leftSide}>
										<p>Всего уникальных персон:</p>
									</div>
									<div className={styles.rightSide}>
										<p>{0}</p>
									</div>
								</div>
							)}
						</div>
					)}
			</Container>
			<Outlet />
		</AdminContent>
	)
}
