import React, { type FC } from 'react'
import cn from 'classnames'

import { RowControllerIconSvg } from 'src/UI/icons/rowControllerIconSVG'

import styles from './index.module.scss'

type RowGridControllerProps = {
	id: number
	removeHandler: (id: number) => void
	className?: string
}

export const RowGridController: FC<RowGridControllerProps> = ({ removeHandler, id, className }) => {
	const handleClickRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
		e.stopPropagation()
		removeHandler(id)
	}

	return (
		<div className={cn(styles.rowControllerWrapper, className)}>
			<button className={styles.rowControllerBtn} type='button'>
				<RowControllerIconSvg />
			</button>
			<div className={cn(styles.rowControllers, 'row-controllers')}>
				<button
					className={styles.removeBtn}
					onClick={(e) => handleClickRemove(e, id)}
					type='button'
				>
					Удалить
				</button>
			</div>
		</div>
	)
}
