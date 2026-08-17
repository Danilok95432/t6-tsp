import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { TicketsFiltrationInputs } from './consts'
import { type EventEntersElem } from 'src/types/events'
import { StatusTickets } from 'src/components/status-tickets/status-tickets'
import { useGetEntersListQuery, useLazyGetEntersCSVQuery } from 'src/store/events/events.api'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'src/components/loader/loader'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { toast } from 'react-toastify'

export const EntersListElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: entersData, isLoading } = useGetEntersListQuery({
		id,
		dateFrom: filterValues.date,
		dateTo: filterValues.date,
		ageGroup: filterValues.age_group,
		ticketNumber: filterValues.ticket_number,
		ticketType: filterValues.ticket_type,
		purchaseType: filterValues.purchase_type,
		status: filterValues.status,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const [getEntersCSV] = useLazyGetEntersCSVQuery()

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleItemsPerPageChange = (value: string) => {
		const newValue = value === 'all' ? 'all' : parseInt(value)
		setItemsPerPage(newValue)
		setCurrentPage(1)
	}

	const downloadHandler = async () => {
		try {
			const blob = await getEntersCSV(id).unwrap()
			const arrayBuffer = await blob.arrayBuffer()

			const decoders = [
				{ name: 'windows-1251', decoder: new TextDecoder('windows-1251') },
				{ name: 'utf-8', decoder: new TextDecoder('utf-8') },
				{ name: 'iso-8859-1', decoder: new TextDecoder('iso-8859-1') },
			]

			let decodedData = ''
			for (const { name, decoder } of decoders) {
				try {
					decodedData = decoder.decode(arrayBuffer)
					if (!decodedData.includes('�')) {
						console.log(`Успешная кодировка: ${name}`)
						break
					}
				} catch (e) {
					console.log(`Кодировка ${name} не подошла`)
				}
			}

			const correctedBlob = new Blob([decodedData], { type: 'text/csv; charset=utf-8' })
			const url = URL.createObjectURL(correctedBlob)

			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', `enters.csv`)
			document.body.appendChild(link)
			link.click()

			document.body.removeChild(link)
			URL.revokeObjectURL(url)
		} catch (error) {
			toast.error(`Ошибка при скачивании CSV: ${error}`, {
				position: 'bottom-right',
			})
		}
	}

	const tableTitles = [
		'ID',
		'Вид билета',
		'Номер билета',
		'Вид покупки',
		'Возрастная группа',
		'Дата и время',
		'Пункт пропуска',
		'Статус',
	]

	const sortTableTitles = ['Дата и время продажи']

	const formatObjectsTableData = (enters: EventEntersElem[]) => {
		return (
			enters?.map((enterEl) => {
				return {
					rowId: enterEl.id,
					cells: [
						<p key='0'>{enterEl.id}</p>,
						<p key='1'>{enterEl.ticket_type}</p>,
						<p key='2' className={styles.center}>
							{enterEl.ticket_number}
						</p>,
						<p key='3'>{enterEl.purchase_type}</p>,
						<p key='4' className={styles.center}>
							{enterEl.age_group}
						</p>,
						<p key='5'>{enterEl.date}</p>,
						<p key='6'>{enterEl.gate}</p>,
						<p className={cn(styles.titleNewsTable)} key='7'>
							{<StatusTickets statusCode={enterEl.status} />}
						</p>,
					],
				}
			}) ?? []
		)
	}

	if (isLoading || !entersData?.enters) return <Loader />

	return (
		<div className={styles.eventNewsContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TicketsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData(entersData?.enters ?? [])}
				colTitles={tableTitles}
				sortTitles={sortTableTitles}
			/>
			<TableFooter
				totalElements={Number(entersData?.total)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(entersData.total) /
						(itemsPerPage === 'all' ? Number(entersData.total) : itemsPerPage),
				)}
				onPageChange={handlePageChange}
				onLimitChange={handleItemsPerPageChange}
				noAdd
				downloadBtn
				downloadHandler={downloadHandler}
				ticketStyle
			/>
		</div>
	)
}
