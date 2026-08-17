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
					name='use_reg'
					label='Включить регистрацию на событие'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Открыть регистрацию на событие. Будет использована стандартная форма, в составе которой
					только имя гостя и номер его телефона.
				</p>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_group'
					label='Разрешить регистрацию групп'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Разрешить групповую регистрацию. Будет использована стандартная форма: название группы,
					имя, фамилия, дата рождения старшего группы, номер его телефона, имя, фамилия, дата
					рождения каждого из участников.
				</p>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_sale'
					label='Открыть продажу билетов'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Подключить продажу билетов. Будет использован шаблон стандартного платного билета.
					Название стандартного билета — «Билет».
				</p>
				<FlexRow className={styles.inputRow}>
					<p className={styles.label}>Цена стандартного билета:</p>
					<ControlledInput maxWidth='150px' name='price' />
					<p>₽</p>
				</FlexRow>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_one_ticket'
					label='Вся группа по одному билету'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Разрешить множественный проход группы по одному билету. QR-rод билета сработает столько
					раз подряд, сколько в группе оплаченных гостей.
				</p>
			</FlexRow>
			<FlexRow className={styles.checkboxRow}>
				<ControlledCheckbox
					name='use_count'
					label='Ограничить количество посетителей'
					type='checkbox'
					className={styles.checkbox}
				/>
				<p className={styles.desc}>
					Количество регистраций будет ограничено. В случае, если предусмотрена групповая
					регистрация, каждый зарегистрированный в группе гость считается за одного уникального.
				</p>
				<FlexRow className={styles.inputRow}>
					<p className={styles.label}>Гостей не более:</p>
					<ControlledInput maxWidth='150px' name='guests' />
				</FlexRow>
			</FlexRow>
		</AdminSection>
	)
}
