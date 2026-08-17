import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { TraditionElementsFiltrationInputs } from './consts'
import { mainFormatDate } from 'src/helpers/utils'
import { type TraditionItem } from 'src/types/community'

import { RowController } from 'src/components/row-controller/row-controller'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { GridRow } from 'src/components/grid-row/grid-row'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'

import styles from './index.module.scss'

export const TraditionsElements: FC = () => {
	const navigate = useNavigate()

	const traditionsData = [
		{
			id: '1',
			title: 'Русский этноспорт',
			createdate: new Date(),
			website: 'ethnosport.ru',
			hidden: false,
		},
		{
			id: '2',
			title: 'Башкирский этноспорт',
			createdate: new Date(),
			website: 'bigmanitoodwelling.com',
			hidden: false,
		},
	]

	const tableTitles = ['Наименование элемента', 'Размещено', 'Отдельный сайт', '']
	const formatTraditionsTableData = (traditionsData: TraditionItem[]) => {
		return traditionsData.map((traditionEl) => {
			return {
				rowId: traditionEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': traditionEl.hidden })} key='0'>
						{traditionEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': traditionEl.hidden })} key='1'>
						{mainFormatDate(traditionEl.createdate)}
					</p>,
					traditionEl.website ? (
						<a
							className={cn({ 'hidden-cell': traditionEl.hidden }, styles.cultureTableLink)}
							href={traditionEl.website}
							key='4'
						>
							{traditionEl.website}
						</a>
					) : (
						<p key='4' className={cn({ 'hidden-cell': traditionEl.hidden })}>
							нет сайта
						</p>
					),
					<RowController
						id={traditionEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть направление'
						key='5'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		console.log(id)
	}
	const rowHideHandler = async (id: string) => {
		console.log(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/tradition/tradition-info/${id}`)
	}

	const handleAddCultureClick = async () => {
		// const newId = await addTradition()
		// navigate(`/tradition-info/${newId}`)
	}

	return (
		<div>
			<GridRow $margin='0 0 15px 0' className={styles.searchRow}>
				<TableFiltration filterInputs={TraditionElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.traditionsTable}
				rowData={formatTraditionsTableData(traditionsData)}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				// totalElements={cultures.length}
				addClickHandler={handleAddCultureClick}
				addText='Добавить элемент'
			/>
		</div>
	)
}
