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
import { type GoodsElement } from 'src/types/catalogTypes'
import {
	useDeleteGoodsByIdMutation,
	useGetAllGoodsQuery,
	useGetNewIdGoodsQuery,
} from 'src/store/catalog/catalog.api'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { GoodsElementsFiltrationInputs } from './consts'

export const GoodsList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: goodsInfoData } = useGetAllGoodsQuery({
		title: filterValues.title,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const { refetch: getNewId } = useGetNewIdGoodsQuery(null)
	const [deleteTypeById] = useDeleteGoodsByIdMutation()

	const navigate = useNavigate()

	const addMaker = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'ID',
		'Название товара',
		'Порядок',
		'Тип товара',
		'Производитель',
		'Категория',
		'Цена (основа)',
		'Цена (на сайте)',
		'Хит',
		'Спрятать',
		'',
	]
	const formatObjectsTableData = (goodsData: GoodsElement[]) => {
		return goodsData.map((goodsEl) => {
			return {
				rowId: goodsEl.id,
				cells: [
					<p key='0'>{goodsEl.id}</p>,
					<p key='1'>{goodsEl.title}</p>,
					<p key='2'>{goodsEl.artikul}</p>,
					<p key='3'>{goodsEl.item_types}</p>,
					<p key='4'>{goodsEl.brand}</p>,
					<p key='5'>{goodsEl.catalog}</p>,
					<p key='6' className={styles.center}>
						{goodsEl.item_price}
					</p>,
					<p key='7' className={styles.center}>
						{goodsEl.item_price_discount}
					</p>,
					<MainCheckBox
						key='8'
						checked={goodsEl.use_best}
						disabled={true}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperGoods}
					/>,
					<MainCheckBox
						key='9'
						checked={goodsEl.hidden}
						disabled={true}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={goodsEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='10'
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
		navigate(`/catalog/goods/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addMaker()
		navigate(`/catalog/goods/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Товары</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={GoodsElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.goodsTable}
				rowData={formatObjectsTableData(goodsInfoData?.items ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={Number(goodsInfoData?.items.length)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(goodsInfoData?.items.length) /
						(itemsPerPage === 'all' ? Number(goodsInfoData?.items.length) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				addClickHandler={handleAddTypeClick}
				addText='Добавить товар'
			/>
		</div>
	)
}
