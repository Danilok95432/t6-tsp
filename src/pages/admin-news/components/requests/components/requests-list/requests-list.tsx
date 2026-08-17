import { type RequestItem } from 'src/types/requests'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { mainFormatDate } from 'src/helpers/utils'
import {
	useDeleteRequestByIdMutation,
	useGetAllRequestsQuery,
	useHideRequestByIdMutation,
} from 'src/store/requests/requests.api'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { StatusRequests } from 'src/components/status-requests/status-requests'

import styles from './index.module.scss'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useAppSelector } from 'src/hooks/store'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { RequestsElementsFiltrationInputs } from './consts'

export const RequestsList = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const { data: requestsDataResponse, isLoading } = useGetAllRequestsQuery({
		title: filterValues.title,
		date: filterValues.date,
	})
	const [deleteRequestById] = useDeleteRequestByIdMutation()
	const [hideRequestById] = useHideRequestByIdMutation()

	const navigate = useNavigate()

	const tableTitles = ['Наименование', 'Тип заявки', 'Статус', 'Дата', 'Источник', '']
	const formatObjectsTableData = (requestsData: RequestItem[]) => {
		return requestsData.map((requestEl) => {
			return {
				rowId: requestEl.id,
				cells: [
					<p
						className={cn({ 'hidden-cell-icon': requestEl.hidden }, styles.titleRequestsTable)}
						key='0'
					>
						{requestEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': requestEl.hidden })} key='1'>
						{requestEl.request_type}
					</p>,
					<div className={cn({ 'hidden-cell': requestEl.hidden })} key='2'>
						<StatusRequests statusCode={requestEl.id_request_status} />
					</div>,
					<p className={cn({ 'hidden-cell': requestEl.hidden })} key='3'>
						{mainFormatDate(requestEl.date)}
					</p>,
					<p className={cn({ 'hidden-cell': requestEl.hidden })} key='4'>
						{requestEl.source}
					</p>,
					<RowController
						id={requestEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Спрятать заявку'
						key='5'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (requestId: string) => {
		await deleteRequestById(requestId)
	}

	const rowHideHandler = async (id: string) => {
		await hideRequestById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/news/requests-list/${id}`)
	}

	if (isLoading || !requestsDataResponse?.requests) return <Loader />

	return (
		<>
			<h3>Заявки</h3>
			<div>
				<GridRow
					$alignItems='center'
					$margin='0 0 15px 0'
					$padding='0 29px'
					className={styles.searchRow}
				>
					<TableFiltration filterInputs={RequestsElementsFiltrationInputs} />
					<div></div>
					<MainCheckBox
						className={styles.checkBoxWrapperRequest}
						checked={false}
						label='Скрыть размещенные'
					/>
					<MainCheckBox checked={false} label='Скрыть отклоненные' />
					<MainCheckBox checked={false} label='Скрыть отложенные' />
				</GridRow>
				<CustomTable
					className={styles.requestsTable}
					rowData={formatObjectsTableData(requestsDataResponse?.requests)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={requestsDataResponse?.requests.length}
					addClickHandler={() => navigate('/news/requests-list/new')}
					addText='Подать заявку'
				/>
			</div>
		</>
	)
}
