import styles from './index.module.scss'
import { useCallback, type FC } from 'react'
import { toast } from 'react-toastify'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { useCopyToClipboard } from 'src/hooks/copyClipboard/useCopy'
import { type EventPassElement } from 'src/types/events'
import { CopyRowPassSVG } from 'src/UI/icons/copyRowPassSVG'
import { EditRowPassSVG } from 'src/UI/icons/editRowPassSVG'

type TableSectionProps = {
	content: EventPassElement[]
}

export const TableSection: FC<TableSectionProps> = ({ content }) => {
	const tableTitlesSales = ['№', 'Инспектор', 'Зона пропуска', 'Логин', 'Пароль', '']
	const copyToClipboard = useCopyToClipboard()
	const editRow = () => {
		console.log('edit')
	}
	const copyRow = useCallback(
		async (id: string) => {
			const pass = content?.find((passEl) => passEl.id === id)

			if (!pass) {
				console.error('Pass not found')
				return
			}

			const textToCopy = `имя: ${pass.inspector}, логин: ${pass.login}, пароль: ${pass.password}`

			try {
				await copyToClipboard(textToCopy)
				console.log('Скопировано в буфер обмена:', textToCopy)
				toast.success('Данные скопированы в буфер обмена')
			} catch (err) {
				console.error('Ошибка при копировании:', err)
				toast.error('Ошибка копирования')
			}
		},
		[content, copyToClipboard],
	)

	const formatObjectsTableData = (passes: EventPassElement[]) => {
		return (
			passes?.map((passEl) => {
				return {
					rowId: passEl.id,
					cells: [
						<p key='0'>{passEl.id}</p>,
						<p key='1' className={styles.center}>
							{passEl.inspector}
						</p>,
						<p key='2'>{passEl.area}</p>,
						<p key='3'>{passEl.login}</p>,
						<p key='4'>{passEl.password}</p>,
						<RowController
							id={passEl.id}
							variant='custom'
							rejectHandler={copyRow}
							resolveHandler={editRow}
							reqBtnIcon={<CopyRowPassSVG />}
							reqBtnText='Скопировать имя, логин и пароль'
							resBtnIcon={<EditRowPassSVG />}
							resBtnText='Редактировать'
							textOfHidden='Спрятать новость'
							key='5'
						/>,
					],
				}
			}) ?? []
		)
	}
	return (
		<AdminSection isBlock={false} className={styles.tableSection}>
			<h3
				className={styles.title}
			>{`Сгенерирован доступ для выбранного числа инспекторов (${content.length})`}</h3>
			<CustomTable
				className={styles.passesTable}
				rowData={formatObjectsTableData(content)}
				colTitles={tableTitlesSales}
			/>
		</AdminSection>
	)
}
