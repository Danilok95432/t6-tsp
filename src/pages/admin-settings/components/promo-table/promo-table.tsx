import { type PromoBlock } from 'src/types/site-settings'
import cn from 'classnames'

import { useGetPromosQuery } from 'src/store/site-settings/site-settings.api'
import { CustomTable } from 'src/components/custom-table/custom-table'

import { mainFormatDate } from 'src/helpers/utils'
import { RowController } from 'src/components/row-controller/row-controller'
import { Loader } from 'src/components/loader/loader'
import { useActions } from 'src/hooks/actions/actions'
import { PromoModal } from 'src/modals/promo-modal/promo-modal'

import styles from './index.module.scss'
import { TableFooter } from 'src/components/table-footer/table-footer'

export const PromoTable = () => {
	const { data: promoItems, isLoading } = useGetPromosQuery(null)
	const { openModal } = useActions()

	const rowDeleteHandler = async (id: string) => {
		// await deleteCulturesById(id)
		console.log(id)
	}
	const rowHideHandler = async (id: string) => {
		console.log(id + 'спрятан')
	}
	const handlePromoRowClick = (id: string) => {
		console.log(`запрос на id: ${id}`)
		openModal(<PromoModal />)
	}
	const tableTitles = [
		'Название промо-блока',
		'Тип контента',
		'Выбранный контент',
		'Блок создан',
		'',
	]
	const formatPromosTableData = (promosData: PromoBlock[]) => {
		return promosData.map((promoEl) => {
			return {
				rowId: promoEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': promoEl.isHidden })} key='0'>
						{promoEl.title}
					</p>,
					<span className={cn({ 'hidden-cell': promoEl.isHidden })} key='1'>
						{promoEl.contentType}
					</span>,
					<span className={cn({ 'hidden-cell': promoEl.isHidden })} key='2'>
						{promoEl.contentChoice}
					</span>,
					<span className={cn({ 'hidden-cell': promoEl.isHidden })} key='3'>
						{mainFormatDate(promoEl.createdAt)}
					</span>,
					<RowController
						id={promoEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть промо-блок'
						key='4'
					/>,
				],
			}
		})
	}

	if (isLoading || !promoItems) return <Loader />
	return (
		<div className={styles.promosWrapper}>
			<h3>Промо-блоки</h3>
			<CustomTable
				className={styles.promoTable}
				rowData={formatPromosTableData(promoItems)}
				colTitles={tableTitles}
				rowClickHandler={handlePromoRowClick}
			/>
			<TableFooter
				totalElements={promoItems.length}
				addClickHandler={() => openModal(<PromoModal />)}
				addText='Добавить промо-блок'
			/>
		</div>
	)
}
