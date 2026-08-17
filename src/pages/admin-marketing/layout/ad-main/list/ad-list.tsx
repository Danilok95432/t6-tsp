import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomTable } from 'src/components/custom-table/custom-table'

import styles from './index.module.scss'
import { AdBlocks, type AdBlockType } from './consts'

export const AdList: FC = () => {
	const navigate = useNavigate()

	const tableTitles = ['Название рекламного блока']
	const formatObjectsTableData = (data: AdBlockType[]) => {
		return data.map((dataEl) => {
			return {
				rowId: dataEl.id,
				cells: [<p key='0'>{dataEl.title}</p>],
			}
		})
	}

	const rowClickHandler = (id: string) => {
		navigate(AdBlocks?.find((el) => el.id === id)?.link ?? '/')
	}

	return (
		<div>
			<h3>Реклама на главной странице сайта</h3>
			<CustomTable
				className={styles.mainInfoTable}
				rowData={formatObjectsTableData(AdBlocks ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
		</div>
	)
}
