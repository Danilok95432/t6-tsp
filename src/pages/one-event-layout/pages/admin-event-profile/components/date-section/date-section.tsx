import { AdminSection } from 'src/components/admin-section/admin-section'

import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { GridRow } from 'src/components/grid-row/grid-row'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { CustomText } from 'src/components/custom-text/custom-text'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './date-section.module.scss'

export const DateSection = () => {
	return (
		<AdminSection isBlock={false}>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Начало события *
			</CustomText>

			<div className={styles.inputWrapper}>
				<GridRow $template='auto/204px 204px' $width='auto'>
					<ControlledDateInput
						className={adminStyles.adminDateInput}
						name='date_from'
						dateFormat='dd-MM-yyyy'
						placeholder='гггг-мм-дд'
					/>
					<ControlledDateInput
						className={adminStyles.adminTimeInput}
						name='time_from'
						placeholder='чч.мм'
						dateFormat='HH:mm:ss'
						showTimeSelectOnly
						showTimeSelect
					/>
				</GridRow>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_date}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Окончание события *
			</CustomText>
			<GridRow $template='auto/204px 204px'>
				<ControlledDateInput
					className={adminStyles.adminDateInput}
					name='date_to'
					dateFormat='dd-MM-yyyy'
					placeholder='гггг-мм-дд'
					margin='0'
				/>
				<ControlledDateInput
					className={adminStyles.adminTimeInput}
					name='time_to'
					placeholder='чч.мм'
					dateFormat='HH:mm:ss'
					showTimeSelectOnly
					showTimeSelect
					margin='0'
				/>
			</GridRow>
		</AdminSection>
	)
}
