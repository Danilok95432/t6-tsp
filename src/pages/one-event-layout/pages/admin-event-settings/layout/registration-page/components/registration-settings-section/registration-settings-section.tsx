import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { DateSection } from './components/date-section/date-section'
import { FieldsSection } from './components/fields-section/fields-section'

export const RegistationSettingsSection = () => {
	return (
		<AdminSection
			titleText='Регистрация'
			fullSection
			checkBoxSection={
				<ControlledCheckbox
					className={styles.checkBox}
					name='use_reg'
					label='Открыть регистрацию гостей'
					type={'checkbox'}
				/>
			}
		>
			<DateSection />
			<FieldsSection />
		</AdminSection>
	)
}
