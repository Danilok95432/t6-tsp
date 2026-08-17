import { type FC } from 'react'
import { RequestStatusPendingSVG } from 'src/UI/icons/requestStatusPendingSVG'
import { RequestStatusPlacedSVG } from 'src/UI/icons/requestStatusPlacedSVG'
import { RequestStatusRejectedSVG } from 'src/UI/icons/requestStatusRejectedSVG'

import styles from './index.module.scss'

type StatusRequestsProps = {
	statusCode?: string
}

export const StatusRequests: FC<StatusRequestsProps> = ({ statusCode }) => {
	switch (statusCode) {
		case '1':
			return (
				<div className={styles.statusRequest}>
					<RequestStatusPendingSVG />
					<p>отложена</p>
				</div>
			)
		case '2':
			return (
				<div className={styles.statusRequest}>
					<RequestStatusPlacedSVG />
					<p>размещена</p>
				</div>
			)
		case '3':
			return (
				<div className={styles.statusRequest}>
					<RequestStatusRejectedSVG />
					<p>отклонена</p>
				</div>
			)
		default:
			break
	}
}
