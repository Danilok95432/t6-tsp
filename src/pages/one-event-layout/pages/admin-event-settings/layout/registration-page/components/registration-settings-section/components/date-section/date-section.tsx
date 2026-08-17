import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { GridRow } from 'src/components/grid-row/grid-row'
import { CustomText } from 'src/components/custom-text/custom-text'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const DateSection = () => {
	return (
		<FlexRow className={styles.dateSection}>
			<FlexRow className={styles.dateElem}>
				<CustomText $margin='0 0 5px 0' $fontWeight='600'>
					Открытие регистрации *
				</CustomText>

				<div className={styles.inputWrapper}>
					<GridRow $template='auto/204px 204px' $width='auto'>
						<ControlledDateInput
							className={adminStyles.adminDateInput}
							name='startDate'
							dateFormat='yyyy-MM-dd'
							placeholder='гггг-мм-дд'
						/>
						<ControlledDateInput
							className={adminStyles.adminTimeInput}
							name='startTime'
							placeholder='чч.мм'
							dateFormat='HH:mm:ss'
							showTimeSelectOnly
							showTimeSelect
						/>
					</GridRow>
				</div>
			</FlexRow>
			<FlexRow className={styles.dateElem}>
				<CustomText $margin='0 0 5px 0' $fontWeight='600'>
					Закрытие регистрации *
				</CustomText>
				<GridRow $template='auto/204px 204px'>
					<ControlledDateInput
						className={adminStyles.adminDateInput}
						name='endDate'
						dateFormat='yyyy-MM-dd'
						placeholder='гггг-мм-дд'
						margin='0'
					/>
					<ControlledDateInput
						className={adminStyles.adminTimeInput}
						name='endTime'
						placeholder='чч.мм'
						dateFormat='HH:mm:ss'
						showTimeSelectOnly
						showTimeSelect
						margin='0'
					/>
				</GridRow>
			</FlexRow>
		</FlexRow>
	)
}
