import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { CustomText } from 'src/components/custom-text/custom-text'
import { FlexRow } from 'src/components/flex-row/flex-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const DateSection = () => {
	return (
		<AdminSection isBlock={false}>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Желаемая дата публикации
			</CustomText>
			<FlexRow $gap='25px'>
				<ControlledDateInput
					className={adminStyles.adminDateInput}
					name='publicdate'
					dateFormat='yyyy-MM-dd'
					placeholder='гггг-мм-дд'
					margin='0'
				/>
				<ControlledCheckbox
					name='original_date '
					label='Как в оригинальной новости / видеозаписи'
					type='checkbox'
					$margin='8px 0 0 0'
				/>
			</FlexRow>
		</AdminSection>
	)
}
