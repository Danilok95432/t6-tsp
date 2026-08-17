import { useNavigate, useParams } from 'react-router-dom'

import { formatDateTimeTicket, zaezdFormat } from 'src/helpers/utils'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { GroupsFiltrationInputs } from './consts'
import { usePagination } from 'src/hooks/usePagination/usePagination'
import { useGetGroupsQuery } from 'src/store/events/events.api'
import { type EventGroups } from 'src/types/events'

export const GroupElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const { data: groupsData, isLoading } = useGetGroupsQuery({
		id,
		phone: filterValues.phone,
		surname: filterValues.surname,
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

	const { currentPage, paginatedData, totalPages, setCurrentPage, setItemsPerPage } = usePagination(
		{
			data: groupsData?.groups ?? [],
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

	const navigate = useNavigate()

	const tableTitles = [
		'Название группы',
		'Группа участников',
		'Старший группы',
		'Номер телефона',
		'Состав',
		'Билет',
		'Регион',
		'Регистрация',
		'Заезд и выезд',
	]
	const formatObjectsTableData = (groupsData: EventGroups[]) => {
		return groupsData.map((groupEl) => {
			return {
				rowId: groupEl.id,
				cells: [
					<p key='0'>{groupEl.group_name}</p>,
					<p key='1'>{groupEl.role_name}</p>,
					<p key='2'>{groupEl.fio}</p>,
					<p key='3'>{groupEl.phone}</p>,
					<p key='4'>{groupEl.group_count}</p>,
					<p key='5'>{groupEl.ticket_number}</p>,
					<p key='6'>{groupEl.region_name}</p>,
					<p key='7'>{formatDateTimeTicket(String(groupEl.createdate), '-', false, true)}</p>,
					<p key='8'>
						{zaezdFormat([String(groupEl.data_zaezd), String(groupEl.data_viezd.toString())])}
					</p>,
				],
			}
		})
	}

	const rowClickHandler = (id: string) => {
		navigate(`/news/news-list/${id}`)
	}

	if (isLoading || !groupsData?.groups) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={GroupsFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData(paginatedData)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={groupsData?.groups.length}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					onLimitChange={handleItemsPerPageChange}
					downloadBtn
					noAdd
					ticketStyle
				/>
			</div>
		</>
	)
}
