import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { useAppSelector } from 'src/hooks/store'

import { GridRow } from 'src/components/grid-row/grid-row'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'

import styles from './index.module.scss'
import { MainInfoElementsFiltrationInputs } from './consts'
import { type PageInfoElement } from 'src/types/marketing'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import {
	useDeletePageInfoByIdMutation,
	useGetAllPagesInfoQuery,
	useGetNewIdPageInfoQuery,
	useHidePageInfoByIdMutation,
} from 'src/store/marketing/marketing.api'

export const MainInfoList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: pageInfoData } = useGetAllPagesInfoQuery({
		pageName: filterValues.pageName,
	})
	const { refetch: getNewId } = useGetNewIdPageInfoQuery(null)
	const [deletePageInfoById] = useDeletePageInfoByIdMutation()
	const [hidePageInfoById] = useHidePageInfoByIdMutation()

	const navigate = useNavigate()

	const addCustomer = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['ID', 'Название страницы', 'Связанная страница', 'Спрятать', '']
	const formatObjectsTableData = (pageInfoData: PageInfoElement[]) => {
		return pageInfoData.map((padeInfoEl) => {
			return {
				rowId: padeInfoEl.id,
				cells: [
					<p key='0'>{padeInfoEl.id}</p>,
					<p key='1'>{padeInfoEl.page_name}</p>,
					<p key='2'>{padeInfoEl.parent_name}</p>,
					<MainCheckBox
						key='3'
						checked={padeInfoEl.hidden}
						onChangeBox={async () => await hidePageInfoById(padeInfoEl.id)}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={padeInfoEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						noHide
						key='4'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deletePageInfoById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/marketing/main-info/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addCustomer()
		navigate(`/marketing/main-info/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.types) return <Loader />

	return (
		<div>
			<h3>Страницы раздела «Информация»</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={MainInfoElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.mainInfoTable}
				rowData={formatObjectsTableData(pageInfoData?.pages ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={pageInfoData?.pages.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить страницу'
			/>
		</div>
	)
}
