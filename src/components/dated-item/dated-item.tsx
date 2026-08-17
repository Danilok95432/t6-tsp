import { type FC } from 'react'

import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { mainFormatDate } from 'src/helpers/utils'

type DatedItemProps = {
	id: string
	date: Date | [Date, Date]
	prevDate: string
	previewImage: string
	title: string
	desc: string
}
export const DatedItem: FC<DatedItemProps> = ({
	id,
	date,
	prevDate,
	previewImage,
	title,
	desc,
}) => {
	const currentDate = Array.isArray(date) ? new Date(date[0]) : new Date(date)

	const currentMonth = currentDate.getMonth()
	const prevMonth = new Date(prevDate).getMonth()
	const currentYear = currentDate.getFullYear()

	const renderDateInfo = () => {
		if (Array.isArray(date)) {
			return (
				<>
					{mainFormatDate(date[0])} - <br />
					{mainFormatDate(date[1])} {new Date(date[1]).getFullYear()}
				</>
			)
		}
		return <>{mainFormatDate(date)}</>
	}

	return (
		<>
			{currentMonth !== prevMonth && (
				<li className={styles.titleMonth}>
					<span>{mainFormatDate(currentDate)},</span> {currentYear}
				</li>
			)}
			<li className={styles.datedItem} key={id}>
				<Link className={styles.datedItemInner} to={id}>
					<span className={styles.dateInfo}>{renderDateInfo()}</span>
					<div className={styles.datedItemContent}>
						<h5>{title}</h5>
						<p>{desc}</p>
					</div>
					<div className={styles.datedItemImg}>
						<img src={previewImage} alt={title} />
					</div>
				</Link>
			</li>
		</>
	)
}
