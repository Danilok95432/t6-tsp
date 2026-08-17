import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'

type AdSectionProps = {
	number?: number
}

export const AdSection: FC<AdSectionProps> = ({ number = 0 }) => {
	return (
		<AdminSection
			className={styles.adSection}
			isBlock={false}
			titleText={`Секция ${number + 1}`}
			noBorder
		>
			<ControlledInput
				name={`advs[${number}].adv_text`}
				label='Текст секции'
				margin='0 0 20px 0'
				isTextarea
				height='77px'
			/>
		</AdminSection>
	)
}
