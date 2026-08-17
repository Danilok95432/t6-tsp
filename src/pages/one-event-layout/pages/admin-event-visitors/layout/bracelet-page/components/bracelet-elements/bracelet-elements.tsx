import { useNavigate, useParams } from 'react-router-dom'

import { formatDateTimeTicket } from 'src/helpers/utils'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { BraceletFiltrationInputs } from './consts'
import { useGetBraceletsQuery } from 'src/store/events/events.api'
import { type EventBracelets } from 'src/types/events'
import { useState } from 'react'

export const BraceletElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	const { data: braceletData, isLoading } = useGetBraceletsQuery({
		id,
		telphone: filterValues.telphone,
		surname: filterValues.surname,
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

	const tableTitles = [
		'Статус',
		'Номер браслета',
		'ФИО',
		'Билет',
		'Телефон',
		'Роль',
		'Привязка',
		'Привязал',
	]
	const sortTableTitles = ['Привязка']
	const formatObjectsTableData = (braceletsData: EventBracelets[]) => {
		return braceletsData.map((braceletEl) => {
			return {
				rowId: braceletEl.id,
				cells: [
					<p key='0'>{braceletEl.status}</p>,
					<p key='1'>{braceletEl.braslet_code}</p>,
					<p key='2'>{braceletEl.fio}</p>,
					<p key='3'>{braceletEl.ticket_number}</p>,
					<p key='4'>{braceletEl.telphone}</p>,
					<p key='5'>{'-'}</p>,
					<p key='6' className={styles.date}>
						<span>{`${formatDateTimeTicket(braceletEl.createdate)[0]}`}</span>
						<span>{`${formatDateTimeTicket(braceletEl.createdate)[1]}`}</span>
					</p>,
					<p key='7'>{braceletEl.inspector}</p>,
				],
			}
		})
	}

	const rowClickHandler = (id: string) => {
		navigate(`/news/news-list/${id}`)
	}

	const addClickHandler = () => {
		// const newId = await addNews()
		navigate(`/event/event-visitors/1/participants/1`)
	}

	if (isLoading || !braceletData?.braslets) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={BraceletFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData(braceletData?.braslets ?? [])}
					colTitles={tableTitles}
					sortTitles={sortTableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={Number(braceletData?.total) || braceletData.braslets.length}
					currentPage={currentPage}
					totalPages={Math.ceil(
						(Number(braceletData?.total) || braceletData.braslets.length) /
							(itemsPerPage === 'all'
								? Number(braceletData?.total) || braceletData.braslets.length
								: itemsPerPage),
					)}
					onPageChange={handlePageChange}
					onLimitChange={handleItemsPerPageChange}
					downloadBtn
					addText='Добавить привязку'
					addClickHandler={addClickHandler}
					ticketStyle
					importBtn
				/>
			</div>
		</>
	)
}
