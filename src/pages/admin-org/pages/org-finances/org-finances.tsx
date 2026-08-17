import { AdminContent } from 'src/components/admin-content/admin-content'
import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { Outlet } from 'react-router-dom'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { type TabNavigationItem } from 'src/types/navigation'

export const OrgFinances = () => {
	const financesTabs: TabNavigationItem[] = [
		{
			title: 'Сводка',
			link: `/org/finances/stat`,
		},
		{
			title: 'Поступления',
			link: `/org/finances/income`,
		},
		{
			title: 'Запросы на возврат',
			link: `/org/finances/req-refund`,
		},
		{
			title: 'Возвраты',
			link: `/org/finances/refund`,
		},
	]
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.orgPage}>
			<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
				<FlexRow className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>Финансы</h2>
						<TabNavigation variant='visitors' navItems={financesTabs} />
					</div>
				</FlexRow>
			</Container>
			<Outlet />
		</AdminContent>
	)
}
