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
import {
	useDeleteSaleByIdMutation,
	useGetAllSalesQuery,
	useGetNewIdSaleQuery,
} from 'src/store/trading/trading.api'
import { type SalesElement } from 'src/types/trading'
import { SalesElementsFiltrationInputs } from './consts'

export const SalesList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: salesData } = useGetAllSalesQuery({
		dateOrder: filterValues.source,
		customer: filterValues.customer,
		phone: filterValues.phone,
		dateSale: filterValues.date,
	})
	const { refetch: getNewId } = useGetNewIdSaleQuery(null)
	const [deleteTypeById] = useDeleteSaleByIdMutation()

	const navigate = useNavigate()

	const addSale = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'№',
		'Статус',
		'Заказчик',
		'Заказ',
		'Доставка',
		'Сумма',
		'Телефон покупателя',
		'Дата и время заказа',
		'Дата и время продажи',
		'Товаров в заказе',
		'',
	]
	const formatObjectsTableData = (salesData: SalesElement[]) => {
		return salesData.map((salesEl) => {
			return {
				rowId: salesEl.id,
				cells: [
					<p key='0'>{salesEl.id}</p>,
					<p key='1'>{salesEl.status}</p>,
					<p key='2'>{salesEl.customer}</p>,
					<p key='3'>{salesEl.order}</p>,
					<p key='4'>{salesEl.deliver}</p>,
					<p key='5'>{salesEl.sum}</p>,
					<p key='6'>{salesEl.phone}</p>,
					<p key='7'>{salesEl.dateOrder}</p>,
					<p key='8'>{salesEl.dateSales}</p>,
					<p key='9'>{salesEl.amount}</p>,
					<RowController
						id={salesEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='10'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/sales/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addSale()
		navigate(`/sales/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Продажи</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={SalesElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.salesTable}
				rowData={formatObjectsTableData(salesData?.sales ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={salesData?.sales.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить заказ'
			/>
		</div>
	)
}
