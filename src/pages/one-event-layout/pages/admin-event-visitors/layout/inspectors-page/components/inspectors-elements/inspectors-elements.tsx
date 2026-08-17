import { useNavigate, useParams } from 'react-router-dom'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
// import { useAppSelector } from 'src/hooks/store'
// import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { usePagination } from 'src/hooks/usePagination/usePagination'
import { type EventInspectors } from 'src/types/events'
import { RowController } from 'src/components/row-controller/row-controller'
import {
	useDeleteInspectorByIdMutation,
	useGetInspectorsQuery,
	useGetNewIdInspectorQuery,
	useHideInspectorByIdMutation,
} from 'src/store/events/events.api'
import { type FilterTableInput } from 'src/types/global'
import cn from 'classnames'

const inspectorFiltrationInputs: FilterTableInput[] = [
	{
		name: 'phone',
		placeholder: 'искать по наименованию...',
		type: 'text',
	},
]

export const InspectorsElements = () => {
	const { id = '0' } = useParams()
	const { data: inspectorsData, isLoading } = useGetInspectorsQuery(id)
	// const filterValues = useAppSelector(getFiltrationValues)
	// const { data: groupsData, isLoading } = useGetGroupsQuery({
	//	id,
	//	phone: filterValues.phone,
	//	surname: filterValues.surname,
	// })

	const { refetch: getNewId } = useGetNewIdInspectorQuery(id)

	const [deleteInspectorById] = useDeleteInspectorByIdMutation()
	const [hideInspectorById] = useHideInspectorByIdMutation()

	const addInspector = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const { currentPage, paginatedData, totalPages, setCurrentPage, setItemsPerPage } = usePagination(
		{
			data: inspectorsData?.inspectors ?? [],
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

	const hideHandler = async (id: string) => {
		await hideInspectorById(id)
	}

	const deleteHandler = async (id: string) => {
		await deleteInspectorById(id)
	}

	const tableTitles = ['Наименование', 'Пропускные пункты', 'Комментарий', '']
	const formatObjectsTableData = (inspectorsData: EventInspectors[]) => {
		return inspectorsData.map((inspectorEl) => {
			return {
				rowId: inspectorEl.id,
				cells: [
					<p key='0' className={cn({ 'hidden-cell-icon': inspectorEl.hidden })}>
						{inspectorEl.fio}
					</p>,
					<p key='1' className={cn({ 'hidden-cell': inspectorEl.hidden })}>
						{inspectorEl.enter_zone}
					</p>,
					<p key='2' className={cn({ 'hidden-cell': inspectorEl.hidden })}>
						{inspectorEl.description}
					</p>,
					<RowController
						hideHandler={hideHandler}
						removeHandler={deleteHandler}
						id={inspectorEl.id}
						textOfHidden='Скрыть инспектора'
						key='3'
					/>,
				],
			}
		})
	}

	const addClickHandler = async () => {
		const newId = await addInspector()
		navigate(`/event/event-visitors/${id}/inspectors/${newId}`)
	}

	const rowClickHandler = (subId: string) => {
		navigate(`/event/event-visitors/${id}/inspectors/${subId}`)
	}

	if (isLoading || !inspectorsData?.inspectors) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={inspectorFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData(paginatedData)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={inspectorsData?.inspectors.length}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					onLimitChange={handleItemsPerPageChange}
					addClickHandler={addClickHandler}
					addText='Добавить инспектора'
				/>
			</div>
		</>
	)
}
