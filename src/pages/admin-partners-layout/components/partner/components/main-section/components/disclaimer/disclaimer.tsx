import { Link } from 'react-router-dom'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminPromptIconSvg } from 'src/UI/icons/adminPromptIconSVG'

import styles from './index.module.scss'

export const Disclaimer = () => {
	return (
		<div className={styles.disclaimer}>
			<FlexRow $direction='row' $gap='10px' $alignItems='center'>
				<AdminPromptIconSvg />
				<p>
					Недостаточно видов партнерства.{' '}
					<Link to='#' className={styles.discLink}>
						Связаться с поддержкой сайта
					</Link>
				</p>
			</FlexRow>
		</div>
	)
}
