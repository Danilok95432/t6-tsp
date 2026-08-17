import React, { type ReactNode, type FC } from 'react'
import cn from 'classnames'

import { RowControllerIconSvg } from 'src/UI/icons/rowControllerIconSVG'

import styles from './index.module.scss'

type RowControllerProps = {
	textOfHidden?: string
	className?: string
	id: string
	variant?: 'main' | 'custom'
	hideHandler?: (id: string) => void
	removeHandler?: (id: string) => void
	resolveHandler?: (id: string) => void
	rejectHandler?: (id: string) => void
	resBtnText?: string
	reqBtnText?: string
	resBtnIcon?: ReactNode
	reqBtnIcon?: ReactNode
	noHide?: boolean
}

export const RowController: FC<RowControllerProps> = ({
	noHide,
	textOfHidden,
	className,
	variant = 'main',
	reqBtnIcon,
	reqBtnText = '',
	resBtnIcon,
	resBtnText = '',
	hideHandler,
	removeHandler,
	resolveHandler,
	rejectHandler,
	id,
}) => {
	const stopRowClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
	}

	const handleClickHide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		hideHandler?.(id)
	}

	const handleClickRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		removeHandler?.(id)
	}

	const handleResolve = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		resolveHandler?.(id)
	}

	const handleReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		rejectHandler?.(id)
	}

	if (variant === 'custom') {
		return (
			<div className={cn(styles.rowControllerWrapper, className)} onClick={stopRowClick}>
				<button className={styles.rowControllerBtn} type='button' onClick={stopRowClick}>
					<RowControllerIconSvg />
				</button>

				<div className={cn(styles.rowControllers, 'row-controllers')}>
					{resBtnIcon && (
						<button className={styles.resBtn} onClick={(e) => handleResolve(e, id)} type='button'>
							{resBtnIcon}
							<p>{resBtnText ?? 'Скрыть'}</p>
						</button>
					)}

					{reqBtnIcon && (
						<button className={styles.rejBtn} onClick={(e) => handleReject(e, id)} type='button'>
							{reqBtnIcon}
							{reqBtnText}
						</button>
					)}
				</div>
			</div>
		)
	}

	return (
		<div className={cn(styles.rowControllerWrapper, className)} onClick={stopRowClick}>
			<button className={styles.rowControllerBtn} type='button' onClick={stopRowClick}>
				<RowControllerIconSvg />
			</button>

			<div className={cn(styles.rowControllers, 'row-controllers')}>
				{!noHide && (
					<button className={styles.hideBtn} onClick={(e) => handleClickHide(e, id)} type='button'>
						<p>{textOfHidden ?? 'Скрыть'}</p>
					</button>
				)}

				<button
					className={styles.removeBtn}
					onClick={(e) => handleClickRemove(e, id)}
					type='button'
				>
					<p>Удалить</p>
				</button>
			</div>
		</div>
	)
}
