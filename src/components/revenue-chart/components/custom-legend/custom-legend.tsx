import React from 'react'
import styles from './index.module.scss'

interface CustomLegendProps {
	payload?: Array<{
		dataKey: string
		color: string
		value: string
		type: string
	}>
}

export const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
	return (
		<div className={styles.legend}>
			<div className={styles.column}>
				{payload?.map((el, index) => {
					if (el.type === 'rect') {
						return (
							<div className={styles.item} key={index}>
								<div className={styles.colorBar} style={{ backgroundColor: el.color }} />
								<span className={styles.label}>{el.value}</span>
							</div>
						)
					} else return null
				})}
			</div>
			<div className={styles.column}>
				{payload?.map((el, index) => {
					if (el.type === 'line') {
						return (
							<div className={styles.item} key={index}>
								<div className={styles.colorLine} style={{ backgroundColor: el.color }} />
								<span className={styles.label}>{el.value}</span>
							</div>
						)
					} else return null
				})}
			</div>
		</div>
	)
}
