import { type ObjectItem } from 'src/types/objects'
import { useNavigate } from 'react-router-dom'
import { type FC } from 'react'
import cn from 'classnames'

import {
	useDeleteObjectByIdMutation,
	useGetAllObjectsQuery,
	useGetNewIdObjectQuery,
	useHideObjectByIdMutation,
} from 'src/store/objects/objects.api'

import { useAppSelector } from 'src/hooks/store'
import { ObjectsElementsFiltrationInputs } from 'src/pages/admin-objects/components/object-elements/consts'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'

import styles from './index.module.scss'

export const ObjectElements: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: objectsDataResponse } = useGetAllObjectsQuery({
		title: filterValues.title,
		type: filterValues.type,
		relation: filterValues.relation,
	})
	const { refetch: getNewId } = useGetNewIdObjectQuery(null)
	const [deleteObjectById] = useDeleteObjectByIdMutation()
	const [hideObjectById] = useHideObjectByIdMutation()

	const navigate = useNavigate()

	const addObject = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование', 'Тип объекта', 'Принадлежность', '']
	const formatObjectsTableData = (objectsData: ObjectItem[]) => {
		return objectsData.map((objectEl) => {
			return {
				rowId: objectEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': objectEl.hidden })} key='0'>
						{objectEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': objectEl.hidden })} key='1'>
						{objectEl.object_type_name}
					</p>,
					<p className={cn({ 'hidden-cell': objectEl.hidden })} key='2'>
						{objectEl.object_apply_name}
					</p>,
					<RowController
						id={objectEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть объект'
						key='3'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteObjectById(id)
	}
	const rowHideHandler = async (id: string) => {
		await hideObjectById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/object/object-info/${id}`)
	}

	const handleAddObjectClick = async () => {
		const newId = await addObject()
		navigate(`/object/object-info/${newId}`)
	}

	return (
		<div>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={ObjectsElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.objectTable}
				rowData={formatObjectsTableData(objectsDataResponse?.objects ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={objectsDataResponse?.objects.length}
				addClickHandler={handleAddObjectClick}
				addText='Добавить объект'
			/>
		</div>
	)
}
