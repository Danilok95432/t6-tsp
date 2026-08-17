import { type FC } from 'react'
import styles from './index.module.scss'
import { formatDateTimeTicket } from 'src/helpers/utils'
import { type EventParticipantCard } from 'src/types/events'
import { useParams } from 'react-router-dom'
import { useGetEventInfoQuery } from 'src/store/events/events.api'
import cn from 'classnames'

type MainSectionProps = {
	data?: EventParticipantCard
}

export const MainSection: FC<MainSectionProps> = ({ data }) => {
	const { id = '', subId = '' } = useParams()
	const { data: eventData } = useGetEventInfoQuery(id)
	return (
		<div className={styles.mainSection}>
			<h1>{`${data?.fio} (${subId})`}</h1>
			<div className={styles.infoBlock}>
				<div className={styles.infoWrapper}>
					<span>Участник</span>
					<p className={styles.author}>
						<strong>{`${data?.fio}, ID ${subId}`}</strong>
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
						<p>{eventData?.title}</p>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Доступ</span>
					<p>{data?.dopusk}</p>
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
			{data?.use_group === '1' && (
				<div className={cn(styles.infoBlock, styles.groupBlock)}>
					<div className={styles.infoWrapper}>
						<span>Группа</span>
						<p>{data?.group_name}</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Роль в группе</span>
						<p>{data?.group_role}</p>
					</div>
				</div>
			)}
			<div className={styles.listBlock}>
				{data?.sub_events && data?.sub_events?.length > 0 && (
					<div className={styles.infoWrapper}>
						<span className={styles.listTitle}>Выбранные подсобытия</span>
						<ul className={styles.list}>
							{data?.sub_events.map((el, ind) => {
								return <li key={ind}>{el}</li>
							})}
						</ul>
					</div>
				)}
				<div className={styles.infoWrapper}>
					<span>Виды участия</span>
					<p>{data?.roles_list}</p>
				</div>
				{data?.trader_name && data?.trader_name !== '' && (
					<div className={styles.infoWrapper}>
						<span>Описание товаров</span>
						<p>{data?.trader_name}</p>
					</div>
				)}
				{data?.master_name && data?.master_name !== '' && (
					<div className={styles.infoWrapper}>
						<span>Название промыслов</span>
						<p>{data?.master_name}</p>
					</div>
				)}
				{data?.journal_name && data?.journal_name !== '' && (
					<div className={styles.infoWrapper}>
						<span>Журнал, канал или издание</span>
						<p>{data?.journal_name}</p>
					</div>
				)}
				<div className={styles.infoWrapper}>
					<span>Дата и время регистрации:</span>
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
