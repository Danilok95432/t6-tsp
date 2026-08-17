/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CustomTable } from 'src/components/custom-table/custom-table'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { TicketsFiltrationInputs } from './consts'
import { type EventRegistrationsElem } from 'src/types/events'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useState } from 'react'
import {
	useGetRegistrationsListQuery,
	useLazyGetRegistrationsCSVQuery,
} from 'src/store/events/events.api'
import { Loader } from 'src/components/loader/loader'
import { toast } from 'react-toastify'

export const RegistrationsElements = () => {
	const { id = '0' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	const navigate = useNavigate()

	const { data: regsData, isLoading } = useGetRegistrationsListQuery({
		id,
		phone: filterValues.phone,
		surname: filterValues.surname,
		regType: filterValues.reg_type,
		deliverType: filterValues.deliverType,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})
	const [getRegistrationsCSV] = useLazyGetRegistrationsCSVQuery()

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleItemsPerPageChange = (value: string) => {
		const newValue = value === 'all' ? 'all' : parseInt(value)
		setItemsPerPage(newValue)
		setCurrentPage(1)
	}

	const rowClickHandler = (personId: string) => {
		navigate(
			`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventLists}/${id}/${AdminRoute.OnePersonStatistic}/${personId}`,
		)
	}

	const downloadHandler = async () => {
		try {
			const blob = await getRegistrationsCSV(id).unwrap()
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
			link.setAttribute('download', `registrations.csv`)
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
		'Дата и время регистрации',
		'Вид регистрации',
		'Билетов',
		'Телефон',
		'E-mail',
		'Посетитель',
		'Оплачено ₽',
		'Вид доставки',
	]

	const formatObjectsTableData = (registrations: EventRegistrationsElem[]) => {
		return (
			registrations?.map((regEl) => {
				return {
					rowId: regEl.id,
					cells: [
						<p key='0'>{regEl.id}</p>,
						<p key='1'>{regEl.date}</p>,
						<p key='2'>{regEl.reg_type}</p>,
						<p key='3'>{regEl.count_tickets}</p>,
						<p key='4'>{regEl.phone}</p>,
						<p key='5'>{regEl.email}</p>,
						<p key='6'>{regEl.guest}</p>,
						<p key='7'>{regEl.paid}</p>,
						<p key='8'>{regEl.deliver_type}</p>,
					],
				}
			}) ?? []
		)
	}

	if (isLoading || !regsData?.registrations) return <Loader />

	return (
		<div className={styles.eventNewsContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TicketsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData(regsData?.registrations ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={Number(regsData?.total)}
				currentPage={currentPage}
				totalPages={Math.ceil(
					Number(regsData.total) / (itemsPerPage === 'all' ? Number(regsData.total) : itemsPerPage),
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
