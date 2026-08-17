import { AdminSection } from 'src/components/admin-section/admin-section'
import { type FC } from 'react'

import styles from './index.module.scss'

type DescSectionRequestsProps = {
	title?: string
	short?: string
	source?: string
	requestType?: string
}

export const DescSection: FC<DescSectionRequestsProps> = ({
	title = 'Нет названия',
	short = 'Нет описания',
	source = 'Не указан',
	requestType = 'новости',
}) => {
	return (
		<AdminSection isBlock={false} className={styles.descSection}>
			<div className={styles.descBlock}>
				<span>Краткое описание (хранится в базе, предназначено для Вас)</span>
				<p>{short}</p>
			</div>
			<div className={styles.descBlock}>
				<span>Название и ссылка</span>
				<a href='#'>{title}</a>
			</div>
			<div className={styles.descBlock}>
				<span>Тип заявки</span>
				<p>{requestType}</p>
			</div>
			<div className={styles.descBlock}>
				<span>Источник</span>
				<a href='#'>{source}</a>
			</div>
		</AdminSection>
	)
}
