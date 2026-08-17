import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'

import styles from './index.module.scss'
import { type CategoriesElement } from 'src/types/catalogTypes'
import {
	useDeleteCategoryByIdMutation,
	useGetAllCategoriesQuery,
	useGetNewIdCategoryQuery,
} from 'src/store/catalog/catalog.api'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { Loader } from 'src/components/loader/loader'
import { AddSubCategorySVG } from 'src/UI/icons/addSubCategorySVG'
import { TrashIconSvg } from 'src/UI/icons/trashIconSVG'

export const CategoriesList: FC = () => {
	const { data: categoryInfoData, isLoading } = useGetAllCategoriesQuery(null)
	const { refetch: getNewId } = useGetNewIdCategoryQuery(null)
	const [deleteTypeById] = useDeleteCategoryByIdMutation()

	const navigate = useNavigate()

	const addMaker = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Раздел', 'Активен', '']
	const formatObjectsTableData = (categoryData: CategoriesElement[]) => {
		return categoryData.map((categoryEl) => {
			return {
				rowId: categoryEl.id,
				cells: [
					<p key='0'>{categoryEl.title}</p>,
					<MainCheckBox
						key='1'
						checked={!categoryEl.hidden}
						disabled={true}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={categoryEl.id}
						variant='custom'
						resolveHandler={() => console.log('Добавлена подкатегория')}
						resBtnIcon={<AddSubCategorySVG />}
						resBtnText='Добавить подкатегорию'
						reqBtnIcon={<TrashIconSvg />}
						reqBtnText='Удалить'
						rejectHandler={rowDeleteHandler}
						className={styles.rowActionButton}
						key='2'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/catalog/categories/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addMaker()
		navigate(`/catalog/categories/${newId}`)
	}

	if (isLoading || !categoryInfoData?.contents) return <Loader />
	return (
		<div>
			<h3>Категории</h3>
			<CustomTable
				className={styles.categoriesTable}
				rowData={formatObjectsTableData(categoryInfoData?.contents ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={categoryInfoData?.contents.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить категорию'
			/>
		</div>
	)
}
