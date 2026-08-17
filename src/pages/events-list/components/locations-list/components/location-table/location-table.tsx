import { type FC } from 'react'
import { type CicleItem } from 'src/types/events'

import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
import {
	useDeleteCicleByIdMutation,
	useGetAllCiclesQuery,
	useGetNewIdCicleQuery,
	useHideCicleByIdMutation,
} from 'src/store/events/events.api'

import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { LocationsElementsFiltrationInputs } from './consts'

import styles from './index.module.scss'

export const LocationsTable: FC = () => {
	const { data: cicleData, isLoading } = useGetAllCiclesQuery(null)
	const [deleteEventById] = useDeleteCicleByIdMutation()
	const [hideEventById] = useHideCicleByIdMutation()
	const { refetch: getNewId } = useGetNewIdCicleQuery(null)

	const navigate = useNavigate()

	const addEvent = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Название площадки', 'Событий', 'Публичность', 'Организатор', 'Регион', 'Статус', '']
	const formatEventsTableData = (eventsData: CicleItem[]) => {
		return eventsData.map((eventEl) => {
			return {
				rowId: eventEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': eventEl.hidden })} key='0'>
						{eventEl.cicle_name}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='1'>
						{eventEl.cicle_actual_name}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='3'>
						{eventEl.cicle_type_name}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='4'>
						{eventEl.place}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='5'>
						{eventEl.place}
					</p>,
					<p className={cn({ 'hidden-cell': eventEl.hidden })} key='6'>
						{eventEl.place}
					</p>,
					<RowController
						id={eventEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть площадку'
						key='7'
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
		navigate(`/events/locations-list/${id}`)
	}

	const handleAddEventClick = async () => {
		const newId = await addEvent()
		navigate(`/events/locations-list/${newId}`)
	}

	if (isLoading || !cicleData?.cicles) return <Loader />

	return (
		<div>
			<h3>Площадки</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={LocationsElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.eventsTable}
				rowData={formatEventsTableData([])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={0}
				addClickHandler={handleAddEventClick}
				addText='Добавить площадку'
			/>
		</div>
	)
}
