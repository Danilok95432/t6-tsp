import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useAppSelector } from 'src/hooks/store'

import { GridRow } from 'src/components/grid-row/grid-row'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'

import styles from './index.module.scss'
import { TypeElementsFiltrationInputs } from './consts'
import { type TypesElement } from 'src/types/catalogTypes'
import {
	useDeleteTypeByIdMutation,
	useGetAllTypesQuery,
	useGetNewIdTypeQuery,
} from 'src/store/catalog/catalog.api'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { Loader } from 'src/components/loader/loader'

export const TypesList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: TypesInfoData, isLoading } = useGetAllTypesQuery({
		title: filterValues.title,
		category: filterValues.category,
		date: filterValues.date,
	})
	const { refetch: getNewId } = useGetNewIdTypeQuery(null)
	const [deleteTypeById] = useDeleteTypeByIdMutation()

	const navigate = useNavigate()

	const addType = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Тип товара', 'Тип создан', 'Активен', '']
	const formatObjectsTableData = (TypesData: TypesElement[]) => {
		return TypesData.map((TypeEl) => {
			return {
				rowId: TypeEl.id,
				cells: [
					<p key='0'>{TypeEl.title}</p>,
					<p key='1'>{TypeEl.createdate}</p>,
					<MainCheckBox
						key='2'
						checked={!TypeEl.hidden}
						disabled={true}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={TypeEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='3'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/catalog/types/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addType()
		navigate(`/catalog/types/${newId}`)
	}

	if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Типы товаров</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TypeElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.typesTable}
				rowData={formatObjectsTableData(TypesInfoData?.types ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={TypesInfoData?.types.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить тип'
			/>
		</div>
	)
}
