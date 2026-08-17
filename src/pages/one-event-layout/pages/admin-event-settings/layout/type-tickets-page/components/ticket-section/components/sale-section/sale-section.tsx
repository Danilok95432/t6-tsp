import { FlexRow } from 'src/components/flex-row/flex-row'
import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { type FC } from 'react'

type SaleSectionProps = {
	idx?: number
}

export const SaleSection: FC<SaleSectionProps> = ({ idx }) => {
	return (
		<FlexRow className={styles.saleSection}>
			<h3>Скидки</h3>
			<FlexRow className={styles.customCheck}>
				<ControlledCheckbox
					name={`ticket_types[${idx}].use_early`}
					type='checkbox'
					className={styles.checkbox}
				/>
				<FlexRow className={styles.customLabel}>
					<p>Ранний заказ: билет, купленный раньше, чем за</p>
					<ControlledInput
						name={`ticket_types[${idx}].earlyDayLimit`}
						className={styles.inputCustom}
					/>
					<p>дней до события, дешевле на</p>
					<ControlledInput
						name={`ticket_types[${idx}].earlySaleCount`}
						className={styles.inputCustom}
					/>
					<p>₽</p>
				</FlexRow>
			</FlexRow>
			<FlexRow className={styles.customCheck}>
				<ControlledCheckbox
					name={`ticket_types[${idx}].use_group`}
					type='checkbox'
					className={styles.checkbox}
				/>
				<FlexRow className={styles.customLabel}>
					<p>Коллектив: более</p>
					<ControlledInput
						name={`ticket_types[${idx}].guestsCount`}
						className={styles.inputCustom}
					/>
					<p>гостей в одном билете — скидка каждого гостя в билете:</p>
					<ControlledInput name={`ticket_types[${idx}].saleGroup`} className={styles.inputCustom} />
					<p>₽</p>
				</FlexRow>
			</FlexRow>
			<FlexRow className={styles.customCheck}>
				<ControlledCheckbox
					name={`ticket_types[${idx}].use_now`}
					type='checkbox'
					className={styles.checkbox}
				/>
				<FlexRow className={styles.customLabel}>
					<p>Здесь и сейчас: билет, купленный во время события, дешевле на</p>
					<ControlledInput name={`ticket_types[${idx}].saleNow`} className={styles.inputCustom} />
					<p>₽</p>
				</FlexRow>
			</FlexRow>
			<FlexRow className={styles.customCheck}>
				<ControlledCheckbox
					name={`ticket_types[${idx}].use_kid`}
					type='checkbox'
					className={styles.checkbox}
				/>
				<FlexRow className={styles.customLabel}>
					<p>Детский билет: если возраст гостя — 14 лет и менее, скидка такого гостя составляет</p>
					<ControlledInput name={`ticket_types[${idx}].saleKid`} className={styles.inputCustom} />
					<p>₽</p>
				</FlexRow>
			</FlexRow>
		</FlexRow>
	)
}
