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
import { CiclesElementsFiltrationInputs } from './consts'

import styles from './index.module.scss'

export const CiclesTable: FC = () => {
	const { data: cicleData, isLoading } = useGetAllCiclesQuery(null)
	const [deleteEventById] = useDeleteCicleByIdMutation()
	const [hideEventById] = useHideCicleByIdMutation()
	const { refetch: getNewId } = useGetNewIdCicleQuery(null)

	const navigate = useNavigate()

	const addEvent = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование цикла', 'Актуальность', 'Тип события', 'Регион проведения', '']
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
					<RowController
						id={eventEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть цикл'
						key='5'
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
		navigate(`/events/cicles-list/${id}`)
	}

	const handleAddEventClick = async () => {
		const newId = await addEvent()
		navigate(`/events/cicles-list/${newId}`)
	}

	if (isLoading || !cicleData?.cicles) return <Loader />

	return (
		<div>
			<h3>Циклы события</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={CiclesElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.eventsTable}
				rowData={formatEventsTableData(cicleData?.cicles)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={cicleData?.cicles.length}
				addClickHandler={handleAddEventClick}
				addText='Добавить цикл'
			/>
		</div>
	)
}
