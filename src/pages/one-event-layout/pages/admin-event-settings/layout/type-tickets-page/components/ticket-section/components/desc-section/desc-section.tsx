import { FlexRow } from 'src/components/flex-row/flex-row'
import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { type FC } from 'react'

type DescSectionProps = {
	idx?: number
}

export const DescSection: FC<DescSectionProps> = ({ idx }) => {
	return (
		<FlexRow className={styles.descSection}>
			<ControlledInput
				name={`ticket_types[${idx}].desc`}
				isTextarea
				height='80px'
				label='Описание билета *'
				subLabel='Это описание — публичное, то есть, видно на странице продажи билета.'
				maxWidth='50%'
			/>
		</FlexRow>
	)
}
