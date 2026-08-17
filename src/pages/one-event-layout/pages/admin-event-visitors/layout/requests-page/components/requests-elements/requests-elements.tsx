/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import { formatDateTimeTicket } from 'src/helpers/utils'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { RequestsVisitorFiltrationInputs } from './consts'
import { usePagination } from 'src/hooks/usePagination/usePagination'
import { useGetRequestsQuery } from 'src/store/events/events.api'
import { type EventRequests } from 'src/types/events'

export const RequestsElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const { data: requestsData, isLoading } = useGetRequestsQuery({
		id,
		surname: filterValues.surname,
		region: filterValues.region,
		roleName: filterValues.role_name,
	})
	/*

	const { data: newsDataResponse, isLoading } = useGetAllNewsQuery({
		idEvent: id,
		title: filterValues.title,
		date: filterValues.date,
		tags: filterValues.tags,
	})
	const { refetch: getNewId } = useGetNewIdNewsQuery({ idEvent: id, idObject: '' })
	const [deleteNewsById] = useDeleteNewsByIdMutation()
	const [hideNewsById] = useHideNewsByIdMutation()

	const addNews = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

  */

	const navigate = useNavigate()

	const { currentPage, paginatedData, totalPages, setCurrentPage, setItemsPerPage } = usePagination(
		{
			data: requestsData?.requests ?? [],
			initialPage: 1,
			initialItemsPerPage: 100,
		},
	)

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleItemsPerPageChange = (value: string) => {
		const newValue = value === 'all' ? 'all' : parseInt(value)
		setItemsPerPage(newValue)
		setCurrentPage(1)
	}

	const tableTitles = [
		'Автор заявки',
		'Заявка и группа',
		'Тип участия',
		'Вид',
		'Регион',
		'Регистрация',
		'Статус заявки',
	]
	const formatObjectsTableData = (reqData: EventRequests[]) => {
		return reqData.map((reqEl) => {
			return {
				rowId: reqEl.id,
				cells: [
					<p className={cn(styles.titleNewsTable)} key='0'>
						{reqEl.fio}
					</p>,
					<p key='1'>{reqEl.requesttype === 'Групповая' ? reqEl.group_name : reqEl.requesttype}</p>,
					<p key='2'>{reqEl.event_role}</p>,
					<p key='3'>{reqEl.vid ?? '-'}</p>,
					<p key='4'>{reqEl.region_name}</p>,
					<p key='5' className={styles.date}>
						<span>{`${formatDateTimeTicket(reqEl.createdate)[0]}`}</span>
						<span>{`${formatDateTimeTicket(reqEl.createdate)[1]}`}</span>
					</p>,
					<p key='6'>{reqEl.statusname}</p>,
				],
			}
		})
	}

	const rowClickHandler = (subId: string) => {
		navigate(`/event/event-visitors/${id}/requests/${subId}`)
	}

	if (isLoading || !requestsData?.requests) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={RequestsVisitorFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData(paginatedData)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={requestsData?.requests.length}
					noAdd
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					onLimitChange={handleItemsPerPageChange}
				/>
			</div>
		</>
	)
}
