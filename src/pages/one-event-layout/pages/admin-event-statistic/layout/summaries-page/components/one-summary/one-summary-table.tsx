import { CustomTable } from 'src/components/custom-table/custom-table'
// import { Loader } from 'src/components/loader/loader'

import styles from './index.module.scss'
import { type LogServices } from 'src/types/statistic'
import { Container } from 'src/UI/Container/Container'
import { Link, useParams } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const OneSummaryTable = () => {
	const { id = '' } = useParams()
	/* 
	const filterValues = useAppSelector(getFiltrationValues)
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

	const tableTitles = ['Критерий', 'Уточнение', 'Количество']
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
				],
			}
		})
	}

	// if (isLoading || !logServiceData?.log) return <Loader />

	return (
		<Container $padding='0px 0 35px 0'>
			<Container $padding='0px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventStatistic}/${id}/${AdminRoute.Summaries}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку сводок
				</Link>
			</Container>
			<FlexRow className={styles.tableRow}>
				<Container $padding='0px 30px' $margin='35px 0 0 0'>
					<h2 className={styles.titleSummary}>{'Заголовок сводки(сводка)'}</h2>
				</Container>
				<div className={styles.eventNewsContainer}>
					<CustomTable
						className={styles.newsTable}
						rowData={formatObjectsTableData([])}
						colTitles={tableTitles}
					/>
				</div>
				<Container $padding='0px 30px' $margin='0 0 35px 0'>
					<AdminButton as='button' type='button'>
						Редактировать условия
					</AdminButton>
				</Container>
			</FlexRow>
			<Container $padding='0px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventStatistic}/${id}/${AdminRoute.Summaries}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку сводок
				</Link>
			</Container>
		</Container>
	)
}
