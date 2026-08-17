import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'
import { useState } from 'react'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { VisitorFiltrationInputs } from './consts'
import { useGetGuestsQuery } from 'src/store/events/events.api'
import { type EventGuests } from 'src/types/events'
import { formatDateTimeTicket, zaezdFormat } from 'src/helpers/utils'

export const VisitorElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: guestsData, isLoading } = useGetGuestsQuery({
		id,
		phone: filterValues.phone,
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

	const navigate = useNavigate()

	const tableTitles = [
		'Фамилия, имя, отчество',
		'Группа',
		'Номер телефона',
		'Роль',
		'Билет',
		'Регион',
		'Регистрация',
		'Заезд и выезд',
	]

	const formatObjectsTableData = (guests: EventGuests[]) => {
		return (
			guests?.map((guestEl) => {
				return {
					rowId: guestEl.id,
					cells: [
						<p className={cn(styles.titleNewsTable)} key='0'>
							{guestEl.fio}
						</p>,
						<p key='1'>{'-'}</p>,
						<p key='2'>{guestEl.phone}</p>,
						<p key='3'>{guestEl.role}</p>,
						<p key='4'>{guestEl.ticket}</p>,
						<p key='5'>{guestEl.region_name}</p>,
						<p key='6'>{formatDateTimeTicket(String(guestEl.createdate), '-', false, true)}</p>,
						<p key='7'>
							{zaezdFormat([String(guestEl.data_zaezd), String(guestEl.data_viezd.toString())])}
						</p>,
					],
				}
			}) ?? []
		)
	}

	const addClickHandler = () => {
		navigate(`/event/event-visitors/${id}/guests/new`)
	}

	const rowClickHandler = (subId: string) => {
		navigate(`/event/event-visitors/${id}/guests/${subId}`)
	}

	if (isLoading || !guestsData?.guests) return <Loader />

	return (
		<div className={styles.eventNewsContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={VisitorFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData(guestsData.guests)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={Number(guestsData.total)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(guestsData.total) /
						(itemsPerPage === 'all' ? Number(guestsData.total) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				addText='Добавить гостя'
				addClickHandler={addClickHandler}
				downloadBtn
			/>
		</div>
	)
}
