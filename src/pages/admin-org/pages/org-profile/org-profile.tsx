import { AdminContent } from 'src/components/admin-content/admin-content'
import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { type TabNavigationItem } from 'src/types/navigation'
import { Outlet } from 'react-router-dom'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const OrgProfile = () => {
	const profileTabs: TabNavigationItem[] = [
		{
			title: 'Основные данные',
			link: `/org/award/info`,
		},
		{
			title: 'Авторизация',
			link: `/org/award/auth`,
		},
		{
			title: 'Реквизиты',
			link: `/org/award/details`,
		},
	]
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.orgPage}>
			<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
				<FlexRow className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>Профиль организатора</h2>
						<TabNavigation variant='visitors' navItems={profileTabs} />
					</div>
				</FlexRow>
				<Outlet />
			</Container>
		</AdminContent>
	)
}
