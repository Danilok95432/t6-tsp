import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const InfoSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Информация в футере</h2>
			<ControlledInput
				name='info_copyright'
				label='Копирайт'
				placeholder='Название торговой марки и год'
				margin='0 0 20px 0'
			/>
		</AdminSection>
	)
}
