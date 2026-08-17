import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { VisitorFiltrationInputs } from './consts'
import { useGetUsersSecondRequestQuery } from 'src/store/events/events.api'
import { type EventParticipantsSecond } from 'src/types/events'
import { useState } from 'react'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'

export const ParticipantElements = () => {
	const { id = '0' } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(100)
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: usersData, isLoading } = useGetUsersSecondRequestQuery({
		id,
		limit: itemsPerPage === 'all' ? undefined : itemsPerPage,
		page: itemsPerPage === 'all' ? undefined : currentPage,
		phone: filterValues.phone,
		surname: filterValues.surname,
	})

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handleItemsPerPageChange = (value: string) => {
		const newValue = value === 'all' ? 'all' : parseInt(value)
		setItemsPerPage(newValue)
		setCurrentPage(1)
	}

	const navigate = useNavigate()

	const tableTitles = [
		'Фамилия, имя, отчество',
		'Группа участников',
		'Номер телефона',
		'Участие',
		'Вид',
		'Допуск',
		'Билет',
		'Регион',
	]

	const formatObjectsTableData = (users: EventParticipantsSecond[]) => {
		return (
			users?.map((userEl) => {
				return {
					rowId: userEl.id,
					cells: [
						<p className={cn(styles.titleNewsTable)} key='0'>
							{userEl.fio}
						</p>,
						<p key='1'>
							{userEl.group === 'да' || userEl.group === 'Да' ? userEl.group_name : '-'}
						</p>,
						<p key='2'>{userEl.phone}</p>,
						<p key='3'>{userEl.roles}</p>,
						<p key='4'>{userEl.vids ?? '-'}</p>,
						<p key='5'>{userEl.dopusk}</p>,
						<p key='6'>{userEl.ticket_number}</p>,
						<p key='7'>{userEl.region_name}</p>,
					],
				}
			}) ?? []
		)
	}

	const addClickHandler = () => {
		navigate(`/event/event-visitors/${id}/participants/new`)
	}

	const rowClickHandler = (subId: string) => {
		navigate(`/event/event-visitors/${id}/participants/${subId}`)
	}

	if (isLoading || !usersData?.users) return <Loader />

	return (
		<>
			<div className={styles.eventNewsContainer}>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={VisitorFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.newsTable}
					rowData={formatObjectsTableData(usersData.users)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={Number(usersData?.total)}
					currentPage={currentPage}
					totalPages={Math.ceil(
						Number(usersData.total) /
							(itemsPerPage === 'all' ? Number(usersData.total) : itemsPerPage),
					)}
					onPageChange={handlePageChange}
					onLimitChange={handleItemsPerPageChange}
					downloadBtn
					addText='Добавить участника'
					addClickHandler={addClickHandler}
				/>
			</div>
		</>
	)
}
