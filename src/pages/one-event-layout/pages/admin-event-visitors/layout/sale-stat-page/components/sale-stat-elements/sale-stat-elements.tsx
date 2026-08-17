import { CustomTable } from 'src/components/custom-table/custom-table'

import styles from './index.module.scss'
import { type EventSaleStatDiscounts, type EventSaleStatTickets } from 'src/types/events'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { Container } from 'src/UI/Container/Container'
import { SalesSVG } from 'src/UI/icons/salesSVG'
import { ReturnedSVG } from 'src/UI/icons/returnedSVG'
import { TotalSVG } from 'src/UI/icons/totalSVG'
import { useParams } from 'react-router-dom'
import { useGetSaleStatQuery } from 'src/store/events/events.api'
import { Loader } from 'src/components/loader/loader'

export const SaleStatElements = () => {
	const { id = '0' } = useParams()
	const { data: saleStatData, isLoading } = useGetSaleStatQuery(id)
	const tableTitlesTickets = [
		'Вид билета',
		'Всего проданно',
		'Сумма продаж',
		'Возвращено',
		'Сумма возвратов',
		'Скидки на сумму',
		'Итоговая выручка',
	]

	const tableTitlesSales = ['Вид скидки', 'Всего раз', 'Всего на сумму']

	const formatObjectsTicketsTableData = (tickets: EventSaleStatTickets[]) => {
		return (
			tickets?.map((ticketEl) => {
				return {
					rowId: ticketEl.id,
					cells: [
						<p key='0'>{ticketEl.type}</p>,
						<p key='1' className={styles.center}>
							{ticketEl.total_count}
						</p>,
						<p key='2' className={styles.center}>
							{ticketEl.sum}
						</p>,
						<p key='3' className={styles.center}>
							{ticketEl.refund}
						</p>,
						<p key='4' className={styles.center}>
							{ticketEl.sum_refund}
						</p>,
						<p key='5' className={styles.center}>
							{ticketEl.discount}
						</p>,
						<p key='6' className={styles.center}>
							{ticketEl.total_sum}
						</p>,
					],
				}
			}) ?? []
		)
	}

	const formatObjectsSalesTableData = (discounts: EventSaleStatDiscounts[]) => {
		return (
			discounts?.map((discountEl) => {
				return {
					rowId: discountEl.id,
					cells: [
						<p key='0'>{discountEl.type}</p>,
						<p key='1' className={styles.center}>
							{discountEl.count}
						</p>,
						<p key='2' className={styles.center}>
							{discountEl.sum}
						</p>,
					],
				}
			}) ?? []
		)
	}

	if (isLoading || !saleStatData) return <Loader />

	return (
		<div className={styles.salePage}>
			<Container $padding='0 30px 30px 30px'>
				<FlexRow className={styles.headRow}>
					<div className={styles.headElement}>
						<FlexRow className={styles.title}>
							<p>Продажи:</p>
							<p>{saleStatData?.sales ?? 0} ₽</p>
						</FlexRow>
						<SalesSVG />
					</div>
					<div className={styles.headElement}>
						<FlexRow className={styles.title}>
							<p>Возвраты:</p>
							<p>{saleStatData?.refunds ?? 0} ₽</p>
						</FlexRow>
						<ReturnedSVG />
					</div>
					<div className={styles.headElement}>
						<FlexRow className={styles.title}>
							<p>Сумма:</p>
							<p>{saleStatData?.sum ?? 0} ₽</p>
						</FlexRow>
						<TotalSVG />
					</div>
				</FlexRow>
				<FlexRow className={styles.ticketsRow}>
					<h2>Билеты</h2>
					<FlexRow className={styles.ticketsTotalInfo}>
						<p className={styles.totalInfo}>
							Продано всех видов: <strong>{saleStatData?.tickets_info.saled_total ?? 0}</strong>
						</p>
						<p className={styles.totalInfo}>
							Продано бесплатных: <strong>{saleStatData?.tickets_info.saled_free ?? 0}</strong>
						</p>
						<p className={styles.totalInfo}>
							Возврат платных: <strong>{saleStatData?.tickets_info.refund_paid ?? 0}</strong>
						</p>
						<p className={styles.totalInfo}>
							Возврат бесплатных: <strong>{saleStatData?.tickets_info.refund_free ?? 0}</strong>
						</p>
					</FlexRow>
					<CustomTable
						className={styles.ticketsTable}
						rowData={formatObjectsTicketsTableData(saleStatData?.tickets_info.tickets ?? [])}
						colTitles={tableTitlesTickets}
					/>
				</FlexRow>
				<FlexRow className={styles.salesRow}>
					<h2>Скидки</h2>
					<p className={styles.totalInfo}>
						Всего на сумму: <strong>{saleStatData?.tickets_info.discounts_info.sum ?? 0} ₽</strong>
					</p>
					<CustomTable
						className={styles.salesTable}
						rowData={formatObjectsSalesTableData(
							saleStatData?.tickets_info.discounts_info.discounts ?? [],
						)}
						colTitles={tableTitlesSales}
					/>
				</FlexRow>
			</Container>
		</div>
	)
}
