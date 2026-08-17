import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const SettingsSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Настройки сайта</h2>
			<ControlledInput
				name='site_title'
				label='Заголовок сайта (title)'
				placeholder='Заголовок сайта (title)'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='metric'
				label='Код счетика'
				placeholder='Код счетика'
				isTextarea
				height='150px'
			/>
		</AdminSection>
	)
}
