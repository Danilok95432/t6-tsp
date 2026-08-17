import { type FC } from 'react'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { Container } from 'src/UI/Container/Container'
import styles from './index.module.scss'

export const OnePersonStatistic: FC = () => {
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.orgPage}>
			<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
				<div className={styles.adminTitleTab}>
					<h2>Один гость</h2>
				</div>
			</Container>
		</AdminContent>
	)
}
