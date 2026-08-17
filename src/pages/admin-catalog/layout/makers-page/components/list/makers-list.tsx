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
import { type MakersElement } from 'src/types/catalogTypes'
import {
	useDeleteMakerByIdMutation,
	useGetAllMakersQuery,
	useGetNewIdMakerQuery,
} from 'src/store/catalog/catalog.api'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { MakerElementsFiltrationInputs } from './consts'
import { Loader } from 'src/components/loader/loader'

export const MakersList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: makersInfoData, isLoading } = useGetAllMakersQuery({
		title: filterValues.title,
		country: filterValues.country,
		urlMaker: filterValues.urlMaker,
		types: filterValues.types,
	})
	const { refetch: getNewId } = useGetNewIdMakerQuery(null)
	const [deleteTypeById] = useDeleteMakerByIdMutation()

	const navigate = useNavigate()

	const addMaker = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование', 'Страна', 'Ссылка', 'Активен', '']
	const formatObjectsTableData = (makersData: MakersElement[]) => {
		return makersData.map((makerEl) => {
			return {
				rowId: makerEl.id,
				cells: [
					<p key='0'>{makerEl.title}</p>,
					<p key='1'>{makerEl.country}</p>,
					<p key='2'>{makerEl.brand_link}</p>,
					<MainCheckBox
						key='3'
						checked={makerEl.hidden}
						disabled={true}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={makerEl.id}
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
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/catalog/makers/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addMaker()
		navigate(`/catalog/makers/${newId}`)
	}

	if (isLoading || !makersInfoData?.brands) return <Loader />

	return (
		<div>
			<h3>Производители</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={MakerElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.makersTable}
				rowData={formatObjectsTableData(makersInfoData?.brands ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={makersInfoData?.brands.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить производителя'
			/>
		</div>
	)
}
