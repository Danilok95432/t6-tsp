import React from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

type CustomXAxisTickProps = {
	x: number
	y: number
	payload: {
		value: string
	}
	index: number
	activeIndex: string
}

const formatDate = (dateString: string, isActive: boolean): string => {
	const date = new Date(dateString)

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date string')
	}

	if (isActive) {
		// Активный формат: "Октябрь 1, 2025"
		const month = date.toLocaleString('ru-RU', { month: 'long' })
		const day = date.getDate()
		const year = date.getFullYear()
		return `${capitalizeFirstLetter(month)} ${day}, ${year}`
	} else {
		// Неактивный формат: "Окт 1"
		const month = date.toLocaleString('ru-RU', { month: 'short' })
		const day = date.getDate()
		return `${capitalizeFirstLetter(month)} ${day}`
	}
}

const capitalizeFirstLetter = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({
	x,
	y,
	payload,
	index,
	activeIndex,
}) => {
	const isActive = index === Number(activeIndex)
	return (
		<g transform={isActive ? `translate(${x - 45},${y})` : `translate(${x},${y})`}>
			{isActive && (
				<rect
					className={styles.container}
					x={-24}
					y={-8}
					width={136}
					height={39}
					rx={4}
					fill='#145073'
					fillOpacity={1}
				/>
			)}
			<text
				x={isActive ? 42 : 0}
				y={0}
				dy={16}
				textAnchor='middle'
				fontSize={14}
				fontWeight={500}
				fill={isActive ? '#fff' : '#000'}
				className={cn(styles.text, { [styles.activeText]: isActive })}
			>
				{formatDate(payload.value, isActive)}
			</text>
		</g>
	)
}
