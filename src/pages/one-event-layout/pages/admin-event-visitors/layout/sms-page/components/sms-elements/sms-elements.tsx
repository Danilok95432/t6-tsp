import { CustomTable } from 'src/components/custom-table/custom-table'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { TicketsFiltrationInputs } from './consts'
import { type EventSMSElem } from 'src/types/events'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'src/components/loader/loader'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useGetSMSListQuery, useLazyGetSMSCSVQuery } from 'src/store/events/events.api'
import { toast } from 'react-toastify'

export const SMSElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)

	const { data: smsData, isLoading } = useGetSMSListQuery({
		id,
		phone: filterValues.phone,
		operator: filterValues.operator,
		smsType: filterValues.sms_type,
		status: filterValues.status,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const [getSMSCSV] = useLazyGetSMSCSVQuery()

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
			const blob = await getSMSCSV(id).unwrap()
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
			link.setAttribute('download', `sms_stats.csv`)
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
		'Тип сообщения',
		'Телефон',
		'Статус',
		'Оператор получателя',
		'Отправлено',
		'Доставлено',
		'Стоимость ₽',
	]

	const formatObjectsTableData = (sms: EventSMSElem[]) => {
		return (
			sms?.map((smsEl) => {
				return {
					rowId: smsEl.id,
					cells: [
						<p key='0'>{smsEl.id}</p>,
						<p key='1'>{smsEl.type}</p>,
						<p key='2'>{smsEl.phone}</p>,
						<p key='3'>{smsEl.status}</p>,
						<p key='4' className={styles.center}>
							{smsEl.operator}
						</p>,
						<p key='5'>{smsEl.sended}</p>,
						<p key='6'>{smsEl.delivered}</p>,
						<p key='7'>{smsEl.cost}</p>,
					],
				}
			}) ?? []
		)
	}

	if (isLoading || !smsData?.sms) return <Loader />

	return (
		<div className={styles.eventNewsContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TicketsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData(smsData?.sms ?? [])}
				colTitles={tableTitles}
			/>
			<TableFooter
				totalElements={Number(smsData?.total)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(smsData.total) / (itemsPerPage === 'all' ? Number(smsData.total) : itemsPerPage),
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
