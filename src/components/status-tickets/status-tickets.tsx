import { type FC } from 'react'
import { RequestStatusPlacedSVG } from 'src/UI/icons/requestStatusPlacedSVG'
import { RequestStatusRejectedSVG } from 'src/UI/icons/requestStatusRejectedSVG'
import cn from 'classnames'

import styles from './index.module.scss'

type StatusTicketsProps = {
	statusCode?: string
}

export const StatusTickets: FC<StatusTicketsProps> = ({ statusCode }) => {
	switch (statusCode) {
		case 'white':
			return <div className={cn(styles.statusRequest, styles.circle)}></div>
		case 'green':
			return (
				<div className={styles.statusRequest}>
					<RequestStatusPlacedSVG />
				</div>
			)
		case 'red':
			return (
				<div className={styles.statusRequest}>
					<RequestStatusRejectedSVG />
				</div>
			)
		default:
			break
	}
}
