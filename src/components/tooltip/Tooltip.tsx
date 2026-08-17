import { type FC, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './tooltip.module.scss'

interface ITooltipProps {
	text: string
	textHtml?: string
	position?: 'top' | 'bottom' | 'left' | 'right'
	children: React.ReactNode
	delay?: number
	className?: string
	wrapperClassName?: string
}

export const Tooltip: FC<ITooltipProps> = (props) => {
	const {
		text,
		textHtml,
		position = 'top',
		children,
		delay = 500,
		wrapperClassName,
		className,
	} = props

	const [isVisible, setIsVisible] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const showTooltip = () => {
		timeoutRef.current = setTimeout(() => {
			setIsVisible(true)
		}, delay)
	}

	const hideTooltip = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		setIsVisible(false)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	const renderContent = () => {
		if (textHtml) {
			return <span dangerouslySetInnerHTML={{ __html: textHtml }} />
		}
		return text
	}

	return (
		<div
			className={classNames(styles.tooltipWrapper, wrapperClassName)}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			{children}
			<div
				className={classNames(
					styles.tooltipTip,
					className,
					styles[position],
					!isVisible ? styles.hidden : '',
				)}
			>
				{renderContent()}
			</div>
		</div>
	)
}
