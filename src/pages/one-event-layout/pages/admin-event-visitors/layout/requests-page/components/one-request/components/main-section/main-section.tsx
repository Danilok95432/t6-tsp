/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type FC } from 'react'
import styles from './index.module.scss'
import { StatusRequestList } from 'src/components/status-request-lists/status-request-lists'
import { formatDateTimeTicket, participantInfoParser } from 'src/helpers/utils'
import { type EventRequestItem } from 'src/types/events'

type MainSectionProps = {
	data?: EventRequestItem
}

export const MainSection: FC<MainSectionProps> = ({ data }) => {
	const statusSetter = (status: string): string => {
		if (status === 'Ожидание') return '1'
		if (status === 'Принята') return '3'
		return '2'
	}
	if (data?.is_group === 1) {
		return (
			<div className={styles.mainSection}>
				<h1>Заявка групповая №{data.id}</h1>
				<StatusRequestList statusCode={statusSetter(data.statusname)} />
				<div className={styles.infoBlock}>
					<div className={styles.infoWrapper}>
						<span>Автор заявки</span>
						<p className={styles.author}>
							<strong>{data.fio}</strong>
							<span>{data.id_reg_user}</span>
						</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Номер телефона автора заявки</span>
						<p className={styles.author}>
							<p>{data?.phone}</p>
						</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Регион</span>
						<p className={styles.author}>
							<p>{data?.region_name}</p>
						</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Название события</span>
						<p>{data.event}</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Название команды</span>
						<p>Команда</p>
					</div>
					<div className={styles.infoWrapper}>
						<span>Тип группы</span>
						<p>{data?.event_role}</p>
					</div>
					{data?.event_role === 'Торговля' && (
						<div className={styles.infoWrapper}>
							<span>Описание товаров</span>
							<p>{data?.dopinfo}</p>
						</div>
					)}
					{data?.event_role === 'Пресса' && (
						<div className={styles.infoWrapper}>
							<span>Название издания, студии или канала</span>
							<p>{data?.dopinfo}</p>
						</div>
					)}
					{data?.event_role === 'Мастера' && (
						<div className={styles.infoWrapper}>
							<span>Название промысла</span>
							<p>{data?.dopinfo}</p>
						</div>
					)}
				</div>
				<div className={styles.listBlock}>
					{data?.sub_events && data?.sub_events.length > 0 && (
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
						<span className={styles.listTitle}>Вид</span>
						<p>{data?.vid ?? '-'}</p>
					</div>
					{data?.group_users && data?.group_users.length > 0 && (
						<div className={styles.infoWrapper}>
							<span className={styles.listTitle}>Выбранные участники</span>
							<ul className={styles.list}>
								{data?.group_users?.map((el, ind) => {
									return (
										<li key={ind}>
											<span className={styles.bold}>{participantInfoParser(el)[0]}</span>
											<span>{participantInfoParser(el)[1]}</span>
										</li>
									)
								})}
							</ul>
						</div>
					)}
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
					<div className={styles.infoWrapper}>
						<span>Заявка подана:</span>
						<div className={styles.createdate}>
							<p>{formatDateTimeTicket(data?.statusdate ?? '', '.', true)[0]}</p>
							<p>{formatDateTimeTicket(data?.statusdate ?? '', '.', true)[1]}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.mainSection}>
			<h1>Заявка одиночная №{data?.id}</h1>
			<StatusRequestList statusCode={statusSetter(data?.statusname ?? 'Ожидание')} />
			<div className={styles.infoBlock}>
				<div className={styles.infoWrapper}>
					<span>Автор заявки</span>
					<p className={styles.author}>
						<strong>{data?.fio}</strong>
						<span>{data?.id_reg_user}</span>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Номер телефона автора заявки</span>
					<p className={styles.author}>
						<p>{data?.phone}</p>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Регион</span>
					<p className={styles.author}>
						<p>{data?.region_name}</p>
					</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Название события</span>
					<p>{data?.event}</p>
				</div>
				<div className={styles.infoWrapper}>
					<span>Выбранная роль</span>
					<p>{data?.event_role}</p>
				</div>
				{data?.event_role === 'Торговля' && (
					<div className={styles.infoWrapper}>
						<span>Описание товаров</span>
						<p>{data?.dopinfo}</p>
					</div>
				)}
				{data?.event_role === 'Пресса' && (
					<div className={styles.infoWrapper}>
						<span>Название издания, студии или канала</span>
						<p>{data?.dopinfo}</p>
					</div>
				)}
				{data?.event_role === 'Мастера' && (
					<div className={styles.infoWrapper}>
						<span>Название промысла</span>
						<p>{data?.dopinfo}</p>
					</div>
				)}
			</div>
			<div className={styles.listBlock}>
				{data?.sub_events && data?.sub_events.length > 0 && (
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
					<span className={styles.listTitle}>Вид</span>
					<p>{data?.vid ?? '-'}</p>
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
				<div className={styles.infoWrapper}>
					<span>Заявка подана:</span>
					<div className={styles.createdate}>
						<p>{formatDateTimeTicket(data?.statusdate ?? '', '.', true)[0]}</p>
						<p>{formatDateTimeTicket(data?.statusdate ?? '', '.', true)[1]}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
