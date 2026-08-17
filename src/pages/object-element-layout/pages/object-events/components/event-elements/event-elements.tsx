import { useNavigate, useParams } from 'react-router-dom'
import { type FC } from 'react'
import cn from 'classnames'

import { formatDateToYYYYMMDD, mainFormatDate } from 'src/helpers/utils'
import { useDeleteObjectEventsByIdMutation } from 'src/store/objects/objects.api'
import { useTableSearch } from 'src/hooks/table-search/table-search'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { GridRow } from 'src/components/grid-row/grid-row'
import { TableSearchInput } from 'src/modules/table-search-input/table-search'

import styles from './index.module.scss'
import { useGetAllEventsQuery } from 'src/store/events/events.api'
import { type EventItem } from 'src/types/events'

export const EventElements: FC = () => {
	const { id } = useParams()

	const { handleSearch, searchParams } = useTableSearch([
		'title',
		'typeEvent',
		'typePart',
		'startDate',
		'endDate',
	])
	const { data: events, isLoading } = useGetAllEventsQuery({
		idObject: id,
		title: searchParams.title,
	})
	const navigate = useNavigate()

	const [deleteEventById] = useDeleteObjectEventsByIdMutation()

	const tableTitles = ['Наименование', 'Тип события', 'Тип участия', 'Начало', 'Окончание', '']
	const formatObjectsTableData = (eventsData: EventItem[]) => {
		return eventsData.map((eventsEl) => {
			return {
				rowId: eventsEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': eventsEl.hidden })} key='0'>
						{eventsEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': eventsEl.hidden })} key='1'>
						{eventsEl.event_type_name}
					</p>,
					<p className={cn({ 'hidden-cell': eventsEl.hidden })} key='2'>
						{eventsEl.event_part_name}
					</p>,
					<p className={cn({ 'hidden-cell': eventsEl.hidden })} key='3'>
						{typeof eventsEl.date === 'string'
							? formatDateToYYYYMMDD(eventsEl.date)
							: mainFormatDate(eventsEl.date[0])}
					</p>,
					<p className={cn({ 'hidden-cell': eventsEl.hidden })} key='4'>
						{typeof eventsEl.date === 'string' ? null : mainFormatDate(eventsEl.date[1])}
					</p>,
					<RowController
						id={eventsEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Спрятать событие'
						key='5'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (eventId: string) => {
		await deleteEventById({ objectId: id ?? '', eventId })
	}

	const rowHideHandler = async (id: string) => {
		console.log(id + 'спрятан')
	}

	const rowClickHandler = (id: string) => {
		navigate(`/event/event-profile/${id}`)
	}

	if (isLoading || !events) return <Loader />

	return (
		<div>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableSearchInput
					handleSearch={(val) => handleSearch('title', val)}
					placeholder='искать по наименованию события'
				/>
				<TableSearchInput
					handleSearch={(val) => handleSearch('typeEvent', val)}
					placeholder='тип события'
				/>
				<TableSearchInput
					handleSearch={(val) => handleSearch('typePart', val)}
					placeholder='тип участия'
				/>
				<TableSearchInput
					handleSearch={(val) => handleSearch('startDate', val)}
					placeholder='начало'
					$variant='date'
					mask={Date}
				/>
				<TableSearchInput
					handleSearch={(val) => handleSearch('endDate', val)}
					placeholder='окончание'
					$variant='date'
					mask={Date}
				/>
			</GridRow>
			<CustomTable
				className={styles.eventsTable}
				rowData={formatObjectsTableData(events.events)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
		</div>
	)
}
