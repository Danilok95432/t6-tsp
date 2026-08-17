import { AdminSection } from 'src/components/admin-section/admin-section'
import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const MainSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_pass'
					label='Включить пропускную систему'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Подключить систему допуска на событие. Такая система позволяет контролировать проход
					посетителей посредством автоматического турникета или специального приложения-инспектора.
				</p>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_app'
					label='Использовать приложение-инспектор'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Система создаст ключ доступа к приложению-инспектору и три временные учетные записи
					инспекторов. Информация об этих записях появится в настройках события, там же ее можно
					будет поменять или дополнить.
				</p>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_turniket'
					label='Использовать турникеты'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Создать заявку на использование турникетов. В случае наличия технической возможности,
					согласования условий и своевременной оплаты, турникеты будут установлены на площадке
					Вашего события. Охрана в комплект не входит!
				</p>
				<FlexRow className={styles.inputRow}>
					<p className={styles.label}>Количество турникетов:</p>
					<ControlledInput maxWidth='150px' name='price' />
					<p>шт.</p>
				</FlexRow>
			</FlexRow>
		</AdminSection>
	)
}
