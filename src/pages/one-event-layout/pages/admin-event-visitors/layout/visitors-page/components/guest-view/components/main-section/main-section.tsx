import { type FC } from 'react'
import styles from './index.module.scss'
import { formatDateTimeTicket } from 'src/helpers/utils'
import { type EventGuests } from 'src/types/events'
import cn from 'classnames'

type MainSectionProps = {
	data?: EventGuests
}

export const MainSection: FC<MainSectionProps> = ({ data }) => {
	return (
		<div className={styles.mainSection}>
			<h1>{`${data?.fio} (${data?.id_guest_user})`}</h1>
			<div className={styles.infoBlock}>
				<div className={styles.infoWrapper}>
					<span>Гость</span>
					<p className={styles.author}>
						<strong>{`${data?.fio}, ID ${data?.id_guest_user}`}</strong>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Номер телефона</span>
					<p className={styles.author}>
						<p>{`+${data?.phone}`}</p>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Название события</span>
					<p className={styles.author}>
						<p>{data?.event}</p>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Билет</span>
					<p>{data?.ticket}</p>
					<a href={data?.ticket_link} target='_blank' rel='noreferrer'>
						Ссылка на билет
					</a>
				</div>
				<div className={styles.infoWrapper}>
					<span>Регион</span>
					<p>{data?.region_name}</p>
				</div>
			</div>
			<div className={cn(styles.infoBlock, styles.groupBlock)}>
				<div className={styles.infoWrapper}>
					<span>Группа</span>
					<p>{data?.use_group === '1' ? data?.group_name : 'Нет'}</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Роль в группе</span>
					<p>{data?.role}</p>
				</div>
			</div>
			<div className={styles.listBlock}>
				<div className={styles.infoWrapper}>
					<span className={styles.listTitle}>Дата и время регистрации:</span>
					<div className={styles.createdate}>
						<p>{formatDateTimeTicket(data?.createdate ?? '', '.', true)[0]}</p>
						<p>{formatDateTimeTicket(data?.createdate ?? '', '.', true)[1]}</p>
					</div>
				</div>
				{data?.cars && data?.cars?.length > 0 && (
					<div className={styles.infoBlock}>
						<div className={styles.infoWrapper}>
							<span className={styles.listTitle}>Транспортные средства</span>
							<ul className={styles.list}>
								{data?.cars.map((el, ind) => {
									return (
										<li key={ind}>
											<span className={styles.bold}>{el}</span>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
