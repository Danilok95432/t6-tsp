import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { type EventTickets } from 'src/types/events'
import { StatusTickets } from 'src/components/status-tickets/status-tickets'
import { formatDateTimeTicket } from 'src/helpers/utils'
import { TicketsFiltrationInputs } from './consts'

export const OrgIncome = () => {
	// const { id = '0' } = useParams()
	// const filterValues = useAppSelector(getFiltrationValues)
	// const [currentPage, setCurrentPage] = useState(1)
	// const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	// const navigate = useNavigate()

	/* const { data: ticketsData, isLoading } = useGetTicketsQuery({
    id,
    telphone: filterValues.telphone,
    surname: filterValues.surname,
    useGroup: filterValues.use_group,
    limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
    page: itemsPerPage === 'all' ? undefined : currentPage,
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (value: string) => {
    const newValue = value === 'all' ? 'all' : parseInt(value)
    setItemsPerPage(newValue)
    setCurrentPage(1)
  }

  const rowClickHandler = (personId: string) => {
    navigate(
      `/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventLists}/${id}/${AdminRoute.OnePersonStatistic}/${personId}`,
    )
  }
    */

	const tableTitles = [
		'№',
		'Время',
		'Билет',
		'Событие',
		'Гость',
		'Сумма, ₽',
		'Скидка, ₽',
		'Комиссия, %',
		'Выручка, ₽',
	]

	const formatObjectsTableData = (tickets: EventTickets[]) => {
		return (
			tickets?.map((ticketEl) => {
				return {
					rowId: ticketEl.id,
					cells: [
						<p className={cn(styles.titleNewsTable)} key='0'>
							{<StatusTickets statusCode={ticketEl.status} />}
						</p>,
						<p key='1'>{ticketEl.ticket_number}</p>,
						<p key='2' className={styles.date}>
							<span>{`${formatDateTimeTicket(ticketEl.createdate)[0]}`}</span>
							<span>{`${formatDateTimeTicket(ticketEl.createdate)[1]}`}</span>
						</p>,
						<p key='3' className={styles.center}>
							{ticketEl.group}
						</p>,
						<p key='4'>{ticketEl.fio}</p>,
						<p key='5'>{ticketEl.telphone}</p>,
						<p key='6'>{ticketEl.ticket_type}</p>,
						<p key='7'>{ticketEl.delivery_type}</p>,
					],
				}
			}) ?? []
		)
	}

	// if (isLoading || !ticketsData?.tickets) return <Loader />

	return (
		<div className={styles.eventNewsContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TicketsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData([])}
				colTitles={tableTitles}
			/>
			<TableFooter totalElements={0} currentPage={0} totalPages={0} noAdd downloadBtn ticketStyle />
		</div>
	)
}
