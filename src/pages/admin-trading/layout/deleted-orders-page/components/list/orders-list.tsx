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
import {
	useDeleteOrderByIdMutation,
	useGetAllDeletedOrdersQuery,
	useGetNewIdOrderQuery,
} from 'src/store/trading/trading.api'
import { OrderElementsFiltrationInputs } from './consts'
import { type OrdersElement } from 'src/types/trading'

export const DeletedOrdersList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: ordersData } = useGetAllDeletedOrdersQuery({
		source: filterValues.source,
		customer: filterValues.customer,
		phone: filterValues.phone,
		date: filterValues.date,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const { refetch: getNewId } = useGetNewIdOrderQuery(null)
	const [deleteTypeById] = useDeleteOrderByIdMutation()

	const navigate = useNavigate()

	const addOrder = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'№',
		'Статус',
		'Источник',
		'Заказчик',
		'Комментарий к заказу',
		'Стоимость товаров',
		'Стоимость доставки',
		'Сумма всего',
		'Телефон покупателя',
		'Дата и время заказа',
		'Товаров в заказе',
		'',
	]
	const formatObjectsTableData = (ordersData: OrdersElement[]) => {
		return ordersData.map((orderEl) => {
			return {
				rowId: orderEl.id,
				cells: [
					<p key='0'>{orderEl.id}</p>,
					<p key='1'>{orderEl.order_status_name}</p>,
					<p key='2'>{orderEl.order_sourse_name}</p>,
					<p key='3'>{orderEl.fio}</p>,
					<p key='4'>{orderEl.comment}</p>,
					<p key='5'>{orderEl.price_items}</p>,
					<p key='6'>{orderEl.price_delivery}</p>,
					<p key='7'>{orderEl.price_total}</p>,
					<p key='8'>{orderEl.tephone}</p>,
					<p key='9'>{orderEl.order_date}</p>,
					<p key='10'>{orderEl.items_count}</p>,
					<RowController
						id={orderEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='11'
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
		navigate(`/trading/orders/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addOrder()
		navigate(`/trading/orders/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Заказы</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={OrderElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.ordersTable}
				rowData={formatObjectsTableData(ordersData?.orders ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				noAdd
				totalElements={Number(ordersData?.orders.length)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(ordersData?.orders.length) /
						(itemsPerPage === 'all' ? Number(ordersData?.orders.length) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				addClickHandler={handleAddTypeClick}
				addText='Добавить заказ'
			/>
		</div>
	)
}
