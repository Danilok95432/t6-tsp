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
	useDeleteRefundByIdMutation,
	useGetAllRefundsQuery,
	useGetNewIdRefundQuery,
} from 'src/store/trading/trading.api'
import { type RefundsElement } from 'src/types/trading'
import { RefundsElementsFiltrationInputs } from './consts'

export const RefundsList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: refundData } = useGetAllRefundsQuery({
		dateOrder: filterValues.dateOrder,
		customer: filterValues.customer,
		phone: filterValues.phone,
		dateRefund: filterValues.dateRefund,
	})
	const { refetch: getNewId } = useGetNewIdRefundQuery(null)
	const [deleteTypeById] = useDeleteRefundByIdMutation()

	const navigate = useNavigate()

	const addRefund = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'№',
		'Статус',
		'Заказчик',
		'Сумма продажи',
		'Сумма возврата',
		'Сумма удержания',
		'Телефон',
		'Дата и время заказа',
		'Дата и время возврата',
		'',
	]
	const formatObjectsTableData = (refundData: RefundsElement[]) => {
		return refundData.map((refundEl) => {
			return {
				rowId: refundEl.id,
				cells: [
					<p key='0'>{refundEl.id}</p>,
					<p key='1'>{refundEl.status}</p>,
					<p key='2'>{refundEl.customer}</p>,
					<p key='3'>{refundEl.sumSale}</p>,
					<p key='4'>{refundEl.sumRefund}</p>,
					<p key='5'>{refundEl.sumPause}</p>,
					<p key='6'>{refundEl.phone}</p>,
					<p key='7'>{refundEl.dateOrder}</p>,
					<p key='8'>{refundEl.dateRefund}</p>,
					<RowController
						id={refundEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						key='9'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/refunds/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addRefund()
		navigate(`/refunds/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Возвраты</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={RefundsElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.refundsTable}
				rowData={formatObjectsTableData(refundData?.refunds ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={refundData?.refunds.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить заказ'
			/>
		</div>
	)
}
