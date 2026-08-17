import { CustomTable } from 'src/components/custom-table/custom-table'
// import { Loader } from 'src/components/loader/loader'

import styles from './index.module.scss'
import { type LogServices } from 'src/types/statistic'
import { Container } from 'src/UI/Container/Container'
import { Link, useParams } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const OneInspectorStatistic = () => {
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

	const tableTitles = [
		'Временные интервалы',
		'Успешных проходов',
		'Отказов в проходе',
		'Всего сканирований',
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
				],
			}
		})
	}

	// if (isLoading || !logServiceData?.log) return <Loader />

	return (
		<Container $padding='0px 0 35px 0'>
			<Container $padding='0px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventStatistic}/${id}/${AdminRoute.Inspectors}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку АПП и инспекторов
				</Link>
			</Container>
			<FlexRow className={styles.tableRow}>
				<Container $padding='0px 30px' $margin='35px 0 0 0'>
					<h2 className={styles.title}>{'Заголовок инспектора(АПП)'}</h2>
				</Container>
				<Container $padding='0px 30px' $margin='0'>
					<p className={styles.subTitle}>{'Статистика работы в течение события'}</p>
				</Container>
				<div className={styles.eventNewsContainer}>
					<CustomTable
						className={styles.newsTable}
						rowData={formatObjectsTableData([])}
						colTitles={tableTitles}
					/>
				</div>
			</FlexRow>
			<Container $padding='0px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventStatistic}/${id}/${AdminRoute.Inspectors}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку АПП и инспекторов
				</Link>
			</Container>
		</Container>
	)
}
