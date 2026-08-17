import { type EventPartners } from 'src/types/events'
import { Link, useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import {
	useDeleteEventPartnerByIdMutation,
	useGetNewPartnerIdEventQuery,
	useGetPartnersByEventIdQuery,
	useHideEventPartnerByIdMutation,
} from 'src/store/events/events.api'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'

import { Container } from 'src/UI/Container/Container'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
import { PartnerElementsFiltrationInputs } from 'src/pages/admin-partners-layout/components/partners-elements/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const PartnerElements = () => {
	const { id = '' } = useParams()
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: partnersDataResponse, isLoading } = useGetPartnersByEventIdQuery({
		idEvent: id,
		title: filterValues.title,
		partnerVids: filterValues.partner_vids,
		partnerTypes: filterValues.partner_types,
	})
	const { refetch: getNewId } = useGetNewPartnerIdEventQuery(id)
	const [deletePartnerById] = useDeleteEventPartnerByIdMutation()
	const [hidePartnerById] = useHideEventPartnerByIdMutation()

	const navigate = useNavigate()

	const addPartner = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование', 'Вид организации', 'Тип партнерства', 'Очередность', '']

	const formatObjectsTableData = (partnersData: EventPartners[]) => {
		return partnersData.map((partnersEl) => {
			return {
				rowId: partnersEl.id,
				cells: [
					<p
						className={cn({ 'hidden-cell-icon': partnersEl.hidden }, styles.titlePartnersTable)}
						key='0'
					>
						{partnersEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': partnersEl.hidden })} key='1'>
						{partnersEl.partner_vids}
					</p>,
					<p className={cn({ 'hidden-cell': partnersEl.hidden })} key='2'>
						{partnersEl.partner_types}
					</p>,
					<input
						className={cn({ 'hidden-cell': partnersEl.hidden }, styles.priorityBox)}
						key='3'
						type='text'
						value={partnersEl.partner_number ?? ''}
						onChange={(e) =>
							console.log(
								`очередность партнера с id ${partnersEl.id} изменена на значение ${e.target.value}`,
							)
						}
						onClick={(e) => e.stopPropagation()}
					/>,
					<RowController
						id={partnersEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть партнера'
						key='4'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deletePartnerById(id)
	}

	const rowHideHandler = async (id: string) => {
		await hidePartnerById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`${AdminRoute.AdminEventOnePartner}/${id}`)
	}

	const handleAddPartnerClick = async () => {
		const newId = await addPartner()
		navigate(`${AdminRoute.AdminEventOnePartner}/${newId}`)
	}

	if (isLoading || !partnersDataResponse?.partners) return <Loader />

	return (
		<div className={styles.partnerElementsPage}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={PartnerElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.partnersTable}
				rowData={formatObjectsTableData(partnersDataResponse?.partners)}
				rowClickHandler={rowClickHandler}
				colTitles={tableTitles}
			/>
			<TableFooter
				className={styles.tableFooterPartnerWrapper}
				totalElements={partnersDataResponse?.partners.length}
				addClickHandler={handleAddPartnerClick}
				addText='Добавить партнера'
			/>
			<Container $padding='35px 0 54px 30px' $paddingMobile='35px 0 54px 30px' $position='unset'>
				<Link
					to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
					className={adminStyles.adminReturnLinkAbs}
				>
					Возврат к списку событий
				</Link>
			</Container>
		</div>
	)
}
