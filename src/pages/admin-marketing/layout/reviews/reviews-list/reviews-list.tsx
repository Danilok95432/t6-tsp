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
import { type ReviewItem } from 'src/types/marketing'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import {
	useDeleteReviewByIdMutation,
	useGetAllReviewsQuery,
	useGetNewIdReviewQuery,
	useHideReviewByIdMutation,
} from 'src/store/marketing/marketing.api'
import { Loader } from 'src/components/loader/loader'

export const ReviewsList: FC = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: reviewsData, isLoading } = useGetAllReviewsQuery({
		title: filterValues.title,
	})
	const { refetch: getNewId } = useGetNewIdReviewQuery(null)
	const [deletePageInfoById] = useDeleteReviewByIdMutation()
	const [hidePageInfoById] = useHideReviewByIdMutation()

	const navigate = useNavigate()

	const addReview = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['ID', 'ФИО', 'Роль', 'Рейтинг', 'Дата отзыва', 'Спрятать', '']
	const formatObjectsTableData = (reviews: ReviewItem[]) => {
		return reviews.map((review) => {
			return {
				rowId: review.id,
				cells: [
					<p key='0'>{review.id}</p>,
					<p key='1'>{review.fio}</p>,
					<p key='2'>{review.role}</p>,
					<p key='3'>{review.rating}</p>,
					<p key='4'>{review.review_date}</p>,
					<MainCheckBox
						key='5'
						checked={review.hidden}
						onChangeBox={async () => await hidePageInfoById(review.id)}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={review.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						noHide
						key='6'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deletePageInfoById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/marketing/reviews/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addReview()
		navigate(`/marketing/reviews/${newId}`)
	}

	if (isLoading || !reviewsData?.reviews) return <Loader />

	return (
		<div>
			<h3>Отзывы</h3>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={MainInfoElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.mainInfoTable}
				rowData={formatObjectsTableData(reviewsData?.reviews ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				totalElements={reviewsData?.reviews.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить отзыв'
			/>
		</div>
	)
}
