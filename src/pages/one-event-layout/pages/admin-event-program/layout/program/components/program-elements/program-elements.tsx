import { type EventSubEvent } from 'src/types/events'
import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import {
	useDeleteSubEventByIdMutation,
	useGetNewSubEventIdQuery,
	useGetSubEventsByEventIdQuery,
	useHideSubEventByIdMutation,
} from 'src/store/events/events.api'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { ProgramElementsFiltrationInputs } from './consts'
import { formatDateToYYYYMMDD, formatTimeToTable, mainFormatDate } from 'src/helpers/utils'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { Loader } from 'src/components/loader/loader'

export const ProgramElements = () => {
	const { id = '' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: programDataResponse, isLoading } = useGetSubEventsByEventIdQuery({
		idEvent: id,
		title: filterValues.title,
	})
	const { refetch: getNewId } = useGetNewSubEventIdQuery(id)
	const [deletePartnerById] = useDeleteSubEventByIdMutation()
	const [hidePartnerById] = useHideSubEventByIdMutation()

	const navigate = useNavigate()

	const addPartner = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'Название подсобытия',
		'Тип',
		'Вид',
		'Регистрация',
		'Дата',
		'Начало',
		'Окончание',
		'Локация',
		'',
	]

	const formatObjectsTableData = (programData: EventSubEvent[]) => {
		return programData.map((programEl) => {
			return {
				rowId: programEl.id,
				cells: [
					<p
						className={cn({ 'hidden-cell-icon': programEl.hidden }, styles.titleProgramTable)}
						key='0'
					>
						{programEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='1'>
						{programEl.type}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='2'>
						{programEl.vid_name}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='3'>
						{programEl.use_reg ? 'Обязательна' : 'Отключена'}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='4'>
						{typeof programEl.date === 'string'
							? formatDateToYYYYMMDD(programEl.date, '.', 2)
							: mainFormatDate(programEl.date[0])}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='5'>
						{formatTimeToTable(programEl.begin_time as string | null | undefined)}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='6'>
						{formatTimeToTable(programEl.end_time)}
					</p>,
					<p className={cn({ 'hidden-cell': programEl.hidden })} key='7'>
						{programEl.place}
					</p>,
					<RowController
						id={programEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть подсобытие'
						key='4'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deletePartnerById(id)
	}

	const rowHideHandler = async (id: string) => {
		await hidePartnerById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`${AdminRoute.AdminEventOneProgram}/${id}`)
	}

	const handleAddPartnerClick = async () => {
		const newId = await addPartner()
		navigate(`${AdminRoute.AdminEventOneProgram}/${newId}`)
	}

	if (isLoading || !programDataResponse?.sub_events) return <Loader />

	return (
		<div className={styles.programElementsPage}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={ProgramElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.programTable}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				rowData={formatObjectsTableData(programDataResponse.sub_events)}
				rowClickHandler={rowClickHandler}
				colTitles={tableTitles}
			/>
			<TableFooter
				className={styles.tableFooterProgramWrapper}
				totalElements={programDataResponse?.sub_events.length}
				addClickHandler={handleAddPartnerClick}
				addText='Добавить пособытие'
			/>
		</div>
	)
}
