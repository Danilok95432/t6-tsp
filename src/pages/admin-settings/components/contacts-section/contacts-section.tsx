import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const ContactsSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Контакты на сайте</h2>
			<ControlledInput
				name='contact_address'
				label='Почтовый адрес'
				isTextarea
				height='58px'
				placeholder='Почтовый адрес'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='contact_telphone'
				label='Контактный телефон'
				isPhone
				placeholder='+7 (***) ***-**-**'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='contact_email'
				label='Контактный e-mail'
				placeholder='abc@abc.net'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='contact_vk'
				label='Адрес ВК'
				placeholder='Адрес ВК'
				margin='0 0 20px 0'
			/>
		</AdminSection>
	)
}
