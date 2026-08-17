import { type FC } from 'react'
import { type EventItem } from 'src/types/events'

import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
import {
	useDeleteEventByIdMutation,
	useGetAllEventsQuery,
	useGetNewIdEventQuery,
	useHideEventByIdMutation,
} from 'src/store/events/events.api'
import { formatDateToYYYYMMDD, mainFormatDate } from 'src/helpers/utils'

import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { EventsElementsFiltrationInputs } from './consts'

import styles from './index.module.scss'

export const EventsTable: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const { data: eventsDataResponse, isLoading } = useGetAllEventsQuery({
		idObject: filterValues.id_object,
		title: filterValues.title,
		objectTitle: filterValues.object_title,
		dateFrom: filterValues.date_from,
		dateTo: filterValues.date_to,
	})
	const [deleteEventById] = useDeleteEventByIdMutation()
	const [hideEventById] = useHideEventByIdMutation()
	const { refetch: getNewId } = useGetNewIdEventQuery(null)

	const navigate = useNavigate()

	const addEvent = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование события', 'Начало', 'Окончание', 'Площадка', '']
	const formatEventsTableData = (eventsData: EventItem[]) => {
		return eventsData.map((eventEl) => {
			return {
				rowId: eventEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': eventEl.hidden })} key='0'>
						{eventEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='1'>
						{typeof eventEl.date === 'string'
							? formatDateToYYYYMMDD(eventEl.date, '-', 2)
							: mainFormatDate(eventEl.date[0])}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='2'>
						{typeof eventEl.date === 'string' ? null : mainFormatDate(eventEl.date[1])}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='3'>
						{eventEl.object_title}
					</p>,
					<RowController
						id={eventEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть событие'
						key='4'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteEventById(id)
	}
	const rowHideHandler = async (id: string) => {
		await hideEventById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/contest/contest-profile/${id}`)
	}

	const handleAddEventClick = async () => {
		const newId = await addEvent()
		navigate(`/contest/contest-profile/${newId}`)
	}

	if (isLoading || !eventsDataResponse?.events) return <Loader />

	return (
		<div>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={EventsElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.eventsTable}
				rowData={formatEventsTableData(eventsDataResponse?.events)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={eventsDataResponse?.events.length}
				addClickHandler={handleAddEventClick}
				addText='Добавить событие'
			/>
		</div>
	)
}
