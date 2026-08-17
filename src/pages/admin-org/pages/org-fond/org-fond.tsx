import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { Container } from 'src/UI/Container/Container'
import styles from './index.module.scss'

export const OrgFond = () => {
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.orgPage}>
			<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
				<FlexRow className={styles.headRow}>
					<div className={styles.adminTitleTab}>
						<h2>Беляевский фонд</h2>
					</div>
				</FlexRow>
				<Outlet />
			</Container>
		</AdminContent>
	)
}
