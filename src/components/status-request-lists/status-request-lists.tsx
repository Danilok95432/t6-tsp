import { type FC } from 'react'
import { ListRequestStatusOkSVG } from 'src/UI/icons/listRequestStatusOkSVG'
import { ListRequestStatusPendingSVG } from 'src/UI/icons/listRequestStatusPendingSVG'
import { RequestStatusRejectedSVG } from 'src/UI/icons/requestStatusRejectedSVG'
import cn from 'classnames'

import styles from './index.module.scss'

type StatusRequestsListProps = {
	statusCode?: string
	text?: string
	className?: string
}

export const StatusRequestList: FC<StatusRequestsListProps> = ({
	statusCode,
	text = '',
	className,
}) => {
	switch (statusCode) {
		case '1':
			return (
				<div className={cn(styles.statusRequest, styles.pending, className)}>
					<ListRequestStatusPendingSVG />
					<p>{text !== '' ? `${text}: ожидание` : `Статус: ожидание`}</p>
				</div>
			)
		case '2':
			return (
				<div className={cn(styles.statusRequest, styles.reject, className)}>
					<RequestStatusRejectedSVG />
					<p>{text !== '' ? `${text}: отклонена` : `Статус: отклонена`}</p>
				</div>
			)
		case '3':
			return (
				<div className={cn(styles.statusRequest, styles.ok, className)}>
					<ListRequestStatusOkSVG />
					<p>{text !== '' ? `${text}: принята` : `Статус: принята`}</p>
				</div>
			)
		default:
			break
	}
}
