import { type FC } from 'react'
import { type FaqItem } from 'src/types/faq'

import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import {
	useDeleteQuestionByIdMutation,
	useGetAllFaqQuery,
	useGetNewIdFaqQuery,
	useHideQuestionByIdMutation,
} from 'src/store/faq/faq.api'

import { Loader } from 'src/components/loader/loader'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'

export const QuestionsElements: FC = () => {
	const { data: faqInfoData, isLoading } = useGetAllFaqQuery({ idEvent: '' })
	const { refetch: getNewId } = useGetNewIdFaqQuery({ idEvent: '1' })
	const [deleteQuestionById] = useDeleteQuestionByIdMutation()
	const [hideQuestionById] = useHideQuestionByIdMutation()

	const navigate = useNavigate()

	const addQuestion = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Название вопроса', '']

	const formatQuestionsTableData = (questionsData: FaqItem[]) => {
		return questionsData.map((questionEl) => {
			return {
				rowId: questionEl.id,
				cells: [
					<p className={cn({ 'hidden-cell-icon': questionEl.hidden })} key='0'>
						{questionEl.title}
					</p>,
					<RowController
						id={questionEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть вопрос'
						key='4'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteQuestionById(id)
	}
	const rowHideHandler = async (id: string) => {
		await hideQuestionById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/frequent-questions/question/${id}`)
	}

	const handleAddQuestionClick = async () => {
		const newId = await addQuestion()
		navigate(`/frequent-questions/question/${newId}`)
	}

	if (isLoading || !faqInfoData?.faq) return <Loader />

	return (
		<AdminContent
			$backgroundColor='#ffffff'
			$height='786px'
			$padding='30px 0'
			link='/'
			hasBottomLink
			className={styles.questionsPageContent}
			classNameLink={styles.questionsPageLinks}
		>
			<div className={styles.questionTableWrapper}>
				<h3 className={styles['table-title']}>Частые вопросы</h3>

				<CustomTable
					className={styles.questionTable}
					rowData={formatQuestionsTableData(faqInfoData?.faq)}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={faqInfoData?.faq?.length}
					addClickHandler={handleAddQuestionClick}
					addText='Добавить вопрос'
					className={styles.questionTableFooter}
				/>
			</div>
		</AdminContent>
	)
}
