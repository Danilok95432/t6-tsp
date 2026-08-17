import cn from 'classnames'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { CustomText } from 'src/components/custom-text/custom-text'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const DateSection = () => {
	return (
		<AdminSection isBlock={false}>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Дата публикации
			</CustomText>
			<FlexRow $gap='25px'>
				<ControlledDateInput
					className={cn(adminStyles.adminDateInput, styles.dateInput)}
					classNameDatePicker={styles.datePicker}
					name='publicdate'
					dateFormat='yyyy-MM-dd'
					placeholder='гггг-мм-дд'
					margin='0'
				/>
			</FlexRow>
		</AdminSection>
	)
}
