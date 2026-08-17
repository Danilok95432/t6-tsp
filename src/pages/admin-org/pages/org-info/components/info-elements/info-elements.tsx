import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { TicketsFiltrationInputs } from './consts'
import { type EventTickets } from 'src/types/events'
import { StatusTickets } from 'src/components/status-tickets/status-tickets'
import { formatDateTimeTicket } from 'src/helpers/utils'
import { RowController } from 'src/components/row-controller/row-controller'
import { Container } from 'src/UI/Container/Container'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ActiveStatisOrgSVG } from 'src/UI/icons/activeStatusOrgSVG'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { SalesSVG } from 'src/UI/icons/salesSVG'
import { TotalSVG } from 'src/UI/icons/totalSVG'
import { DocumentActionBar } from 'src/components/document-action-bar/document-action-bar'
import { FormProvider, useForm } from 'react-hook-form'
import { type InfoDocumentInputs } from './schema'
import { useNavigate } from 'react-router-dom'

export const InfoElements = () => {
	// const { id = '0' } = useParams()
	// const filterValues = useAppSelector(getFiltrationValues)
	// const [currentPage, setCurrentPage] = useState(1)
	// const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	const navigate = useNavigate()

	/* const { data: ticketsData, isLoading } = useGetTicketsQuery({
		id,
		telphone: filterValues.telphone,
		surname: filterValues.surname,
		useGroup: filterValues.use_group,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
	})

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
    */

	const methods = useForm<InfoDocumentInputs>({
		mode: 'onBlur',
		defaultValues: {
			files: [],
		},
	})

	const tableTitles = [
		'Название документа',
		'Тип документа',
		'Комментарий',
		'Файлы',
		'Сумма',
		'Документ создан',
		'',
	]

	const formatObjectsTableData = (tickets: EventTickets[]) => {
		return (
			tickets?.map((ticketEl) => {
				return {
					rowId: ticketEl.id,
					cells: [
						<p className={cn(styles.titleNewsTable)} key='0'>
							{<StatusTickets statusCode={ticketEl.status} />}
						</p>,
						<p key='1'>{ticketEl.ticket_number}</p>,
						<p key='2' className={styles.date}>
							<span>{`${formatDateTimeTicket(ticketEl.createdate)[0]}`}</span>
							<span>{`${formatDateTimeTicket(ticketEl.createdate)[1]}`}</span>
						</p>,
						<p key='3' className={styles.center}>
							{ticketEl.group}
						</p>,
						<p key='4'>{ticketEl.fio}</p>,
						<p key='5'>{ticketEl.telphone}</p>,
						<p key='6'>{ticketEl.ticket_type}</p>,
						<p key='7'>{ticketEl.delivery_type}</p>,
						<RowController
							id={ticketEl.id}
							hideHandler={rowHideHandler}
							removeHandler={rowDeleteHandler}
							textOfHidden='Спрятать новость'
							key='3'
						/>,
					],
				}
			}) ?? []
		)
	}

	const rowDeleteHandler = async (newsId: string) => {
		console.log(newsId)
	}

	const rowHideHandler = async (id: string) => {
		console.log(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/org/info/${id}`)
	}

	// if (isLoading || !ticketsData?.tickets) return <Loader />

	return (
		<div className={styles.orgContainer}>
			<Container $padding='0 29px'>
				<FlexRow className={styles.headBlock}>
					<FlexRow className={styles.titleSide}>
						<h2 className={styles.title}>{'ООО «Нижкрайсоюзсовсбытагро»'}</h2>
						<FlexRow className={styles.statusRow}>
							<div className={styles.status}>
								<ActiveStatisOrgSVG />
								<p>{'Активирован'}</p>
							</div>
							<p>{'Коммерческий организатор'}</p>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.subtitleSide}>
						<p className={styles.subtitle}>{'Агентская схема, 699 Р в месяц + 7% с продаж'}</p>
						<FlexRow className={styles.subtitleRow}>
							<p>
								ИНН: <strong>{'788 987 763 099'}</strong>
							</p>
							<p>
								ОГРН: <strong>{'788 987 763 099'}</strong>
							</p>
						</FlexRow>
						<AdminButton className={styles.downloadBtn}>Скачать полные реквизиты</AdminButton>
					</FlexRow>
				</FlexRow>
			</Container>
			<Container $padding='0 29px'>
				<FlexRow className={styles.statBlocks}>
					<div className={styles.headElement}>
						<FlexRow className={styles.title}>
							<p>Баланс организатора:</p>
							<p>
								<strong>{'8 000 876.00'} ₽</strong>
							</p>
							<AdminButton className={styles.statBtn}>Открыть отчет о движении средств</AdminButton>
						</FlexRow>
						<FlexRow className={styles.title}>
							<p>Доступно к выводу:</p>
							<p>
								<strong>{'22 094 987.00'} ₽</strong>
							</p>
							<AdminButton className={styles.statBtn}>Заказать вывод средств</AdminButton>
						</FlexRow>
						<SalesSVG color='#184F71' />
					</div>
					<div className={styles.headElement}>
						<FlexRow className={styles.stat}>
							<div className={styles.leftSide}>
								<p>Коммерческий статус:</p>
								<p>Получено за все время:</p>
								<p>Выведено, всего:</p>
							</div>
							<div className={styles.rightSide}>
								<p>{'с 23 ноября 2020 года'}</p>
								<p>{'22 094 987.00'} ₽</p>
								<p>{'22 094 987.00'} ₽</p>
							</div>
						</FlexRow>
						<TotalSVG color='#184F71' />
					</div>
				</FlexRow>
			</Container>
			<Container $padding='0 29px'>
				<FormProvider {...methods}>
					<form>
						<DocumentActionBar
							name='Договор № 27-123 от 23.06.2023'
							subject='Договор на обслуживание организатора мероприятий в системе'
							signStatus='signed'
						/>
						<DocumentActionBar
							name='Договор № 27-123 от 23.06.2023'
							subject='Договор на обслуживание организатора мероприятий в системе'
							signStatus='unsigned'
						/>
						<DocumentActionBar
							name='Необходимо создать договор'
							subject='Договор на обслуживание организатора мероприятий в системе'
							signStatus='none'
						/>
					</form>
				</FormProvider>
			</Container>
			<Container $padding='35px 29px 0 29px'>
				<h2>Документы организатора</h2>
			</Container>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TicketsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.newsTable}
				rowData={formatObjectsTableData([])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter totalElements={0} currentPage={0} totalPages={0} addText='Добавить документ' />
		</div>
	)
}
