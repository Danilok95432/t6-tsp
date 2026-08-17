import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
// import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { TicketsFiltrationInputs } from './consts'
import { formatDateTimeTicket } from 'src/helpers/utils'
import { type LogServices } from 'src/types/statistic'

export const RegionElements = () => {
	/* 
	const filterValues = useAppSelector(getFiltrationValues)
	const { id = '' } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	const { data: logServiceData, isLoading } = useGetAllLogsServiceQuery({
		id,
		surname: filterValues.surname,
		telphone: filterValues.telphone,
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
    */

	const tableTitles = [
		'Регион',
		'REG участников',
		'REG гостей',
		'REG всего',
		'Заранее',
		'На месте',
		'ENT участников',
		'ENT гостей',
		'ENT всего',
	]
	const formatObjectsTableData = (logServices: LogServices[]) => {
		return logServices.map((logEl) => {
			return {
				rowId: logEl.id,
				cells: [
					<p className={styles.title} key='0'>
						{logEl.id}
					</p>,
					<p key='1'>{logEl.service_name}</p>,
					<p key='2'>{logEl.inspector}</p>,
					<p key='3' className={styles.center}>
						{logEl.fio}
					</p>,
					<p key='4'>{logEl.place_name}</p>,
					<p
						key='5'
						className={cn({
							[styles.error]:
								logEl.status_code === '_not-valid' ||
								logEl.status_code === '_not-in-base' ||
								logEl.status_code === '_no-pitanie',
							[styles.repeat]: logEl.status_code === '_cooldown',
							[styles.ok]: logEl.status_code === '_guest',
						})}
					>
						{logEl.status_code === '_no-pitanie' ? 'Вне периода' : logEl.status}
					</p>,
					<p key='6' className={styles.date}>
						<span>{`${formatDateTimeTicket(logEl.scandate)[0]}`}</span>
						<span>{`${formatDateTimeTicket(logEl.scandate)[1]}`}</span>
					</p>,
				],
			}
		})
	}

	// if (isLoading || !logServiceData?.log) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={TicketsFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData([])}
					colTitles={tableTitles}
				/>
				<TableFooter totalElements={0} currentPage={1} noAdd downloadBtn ticketStyle />
			</div>
		</>
	)
}
