import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { type PartnerItem } from 'src/types/partners'
import {
	useDeletePartnerByIdMutation,
	useGetAllPartnersQuery,
	useGetNewIdPartnerQuery,
	useHidePartnerByIdMutation,
} from 'src/store/partners/partners.api'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useAppSelector } from 'src/hooks/store'

import { GridRow } from 'src/components/grid-row/grid-row'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { PartnerElementsFiltrationInputs } from './consts'

import { Loader } from 'src/components/loader/loader'

import styles from './index.module.scss'

export const PartnersElements: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: partnersInfoData, isLoading } = useGetAllPartnersQuery({
		title: filterValues.title,
		partnerVids: filterValues.partner_vids,
		partnerTypes: filterValues.partner_types,
	})
	const { refetch: getNewId } = useGetNewIdPartnerQuery(null)
	const [deletePartnerById] = useDeletePartnerByIdMutation()
	const [hidePartnerById] = useHidePartnerByIdMutation()

	const navigate = useNavigate()

	const addPartner = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = [
		'Наименование',
		'События',
		'Вид организации',
		'Тип партнерства',
		'Очередность',
		'',
	]
	const formatObjectsTableData = (partnersData: PartnerItem[]) => {
		return partnersData.map((partnerEl) => {
			return {
				rowId: partnerEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': partnerEl.hidden })} key='0'>
						{partnerEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': partnerEl.hidden }, styles.eventCount)} key='1'>
						{partnerEl.events_count}
					</p>,
					<p className={cn({ 'hidden-cell': partnerEl.hidden })} key='3'>
						{partnerEl.partner_vids}
					</p>,
					<p className={cn({ 'hidden-cell': partnerEl.hidden })} key='4'>
						{partnerEl.partner_types}
					</p>,
					<input
						className={cn({ 'hidden-cell': partnerEl.hidden }, styles.priorityBox)}
						key='5'
						type='text'
						value={partnerEl.sortid}
						onChange={(e) =>
							console.log(
								`очередность партнера с id ${partnerEl.id} изменена на значение ${e.target.value}`,
							)
						}
						onClick={(e) => e.stopPropagation()}
					/>,
					<RowController
						id={partnerEl.id}
						className={styles.rowActionButton}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть партнёра'
						key='3'
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
		navigate(`/partners/partner/${id}`)
	}

	const handleAddPartnerClick = async () => {
		const newId = await addPartner()
		navigate(`/partners/partner/${newId}`)
	}

	if (isLoading || !partnersInfoData?.partners) return <Loader />

	return (
		<div>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={PartnerElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.objectTable}
				rowData={formatObjectsTableData(partnersInfoData?.partners ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={partnersInfoData?.partners.length}
				addClickHandler={handleAddPartnerClick}
				addText='Добавить партнера'
			/>
		</div>
	)
}
