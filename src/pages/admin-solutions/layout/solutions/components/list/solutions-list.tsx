import { useState, type FC } from 'react'
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
import {
	useDeleteSolutionByIdMutation,
	useGetAllSolutionsQuery,
	useGetNewIdSolutionQuery,
} from 'src/store/solutions/solutions.api'
import { type SolutionInfoElement } from 'src/types/solutions-types'

export const SolutionsList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data } = useGetAllSolutionsQuery({
		title: filterValues.title,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const { refetch: getNewId } = useGetNewIdSolutionQuery(null)
	const [deleteTypeById] = useDeleteSolutionByIdMutation()

	const navigate = useNavigate()

	const addMaker = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'№',
		'Название решения',
		'Описание решения',
		'Стоимость оборудования',
		'Стоимость монтажа',
		'Общая сумма',
		'Категория решения',
		'Уровень решения',
		'',
	]
	const formatObjectsTableData = (data: SolutionInfoElement[]) => {
		return data.map((el) => {
			return {
				rowId: el.id,
				cells: [
					<p key='0'>{el.id}</p>,
					<p key='1'>{el.name}</p>,
					<p key='2'>{el.desc}</p>,
					<p key='3'>{el.sumItems}</p>,
					<p key='4'>{el.sumWork}</p>,
					<p key='5'>{el.totalSum}</p>,
					<p key='6' className={styles.center}>
						{el.category}
					</p>,
					<p key='7' className={styles.center}>
						{el.level}
					</p>,
					<RowController
						id={el.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='8'
					/>,
				],
			}
		})
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleItemsPerPageChange = (value: string) => {
		const newValue = value === 'all' ? 'all' : parseInt(value)
		setItemsPerPage(newValue)
		setCurrentPage(1)
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/solutions/info/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addMaker()
		navigate(`/solutions/info/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Решения</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TypeElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.solutionsTable}
				rowData={formatObjectsTableData(data?.solutions ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={Number(data?.solutions.length)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(data?.solutions.length) /
						(itemsPerPage === 'all' ? Number(data?.solutions.length) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				addClickHandler={handleAddTypeClick}
				addText='Добавить решение'
			/>
		</div>
	)
}
