import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'

export const AdminProgramLayout = () => {
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.visitorsPage}>
			{/*
				{!location.pathname.includes('one-program') && (
				<Container $padding='35px 35px 0 35px' $paddingMobile='35px'>
					<div className={styles.headRow}>
						<div className={styles.adminTitleTab}>
							<h2>{getTitle() === 'Регистрация' ? 'Списки и участие' : getTitle()}</h2>
							<TabNavigation variant='visitors' navItems={eventTabs} />
						</div>
					</div>
				</Container>
			)}
				*/}
			<Outlet />
		</AdminContent>
	)
}
