import { AdminContent } from 'src/components/admin-content/admin-content'
import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const OrgStatistic = () => {
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.orgPage}>
			<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
				<div className={styles.adminTitleTab}>
					<h2>Статистика</h2>
				</div>
			</Container>
		</AdminContent>
	)
}
