import cn from 'classnames'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

type DatesSectionProps = {
	selectOptions?: SelOption[]
}

export const DatesSection: FC<DatesSectionProps> = ({
	selectOptions = [{ label: 'Не выбрано', value: '0' }],
}) => {
	return (
		<div className={cn(styles.formSection, styles._last)}>
			<h2 className={styles.title}>Даты заезда и выезда</h2>
			<FlexRow className={styles.groupInputs}>
				<ControlledSelect
					className={styles.selectForm}
					name='data_zaezd'
					selectOptions={selectOptions}
					label='Дата заезда'
				/>
				<ControlledSelect
					className={styles.selectForm}
					name='data_viezd'
					selectOptions={selectOptions}
					label='Дата отъезда'
				/>
			</FlexRow>
		</div>
	)
}
