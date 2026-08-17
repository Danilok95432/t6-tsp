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
import { CustomerElementsFiltrationInputs } from './consts'
import {
	useDeleteCustomerByIdMutation,
	useGetAllCustomersQuery,
	useGetNewIdCustomerQuery,
} from 'src/store/customers/customers.api'
import { type CustomerElement } from 'src/types/customers'

export const AllCustomersList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: customersData } = useGetAllCustomersQuery({
		customer: filterValues.customer,
		phone: filterValues.phone,
		date: filterValues.date,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const { refetch: getNewId } = useGetNewIdCustomerQuery(null)
	const [deleteCustomerById] = useDeleteCustomerByIdMutation()

	const navigate = useNavigate()

	const addCustomer = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'№',
		'Покупатель',
		'О покупателе',
		'Сумма заказов',
		'Сумма продаж',
		'Сумма возвратов',
		'Телефон покупателя',
		'Дата и время регистрации',
		'Город или регион',
		'',
	]
	const formatObjectsTableData = (customerData: CustomerElement[]) => {
		return customerData.map((customerEl) => {
			return {
				rowId: customerEl.id,
				cells: [
					<p key='0'>{customerEl.id}</p>,
					<p key='1'>{customerEl.user_title}</p>,
					<p key='2'>{customerEl.user_comment}</p>,
					<p key='3'>{customerEl.summa_orders}</p>,
					<p key='4'>{customerEl.summa_sale}</p>,
					<p key='5'>{customerEl.summa_return}</p>,
					<p key='6'>{customerEl.telphone}</p>,
					<p key='7'>{customerEl.regdate}</p>,
					<p key='8'>{customerEl.city_name}</p>,
					<RowController
						id={customerEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='9'
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
		await deleteCustomerById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/customers/all/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addCustomer()
		navigate(`/customers/all/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Все покупатели</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={CustomerElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.customersTable}
				rowData={formatObjectsTableData(customersData?.siteusers ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={Number(customersData?.siteusers.length)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(customersData?.siteusers.length) /
						(itemsPerPage === 'all' ? Number(customersData?.siteusers.length) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				addClickHandler={handleAddTypeClick}
				addText='Добавить покупателя'
			/>
		</div>
	)
}
