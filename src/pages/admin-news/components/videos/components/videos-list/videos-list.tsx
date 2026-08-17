import { type VideoItem } from 'src/types/videos'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { VideosElementsFiltrationInputs } from './consts'
import { mainFormatDate } from 'src/helpers/utils'
import {
	useDeleteVideoByIdMutation,
	useGetAllVideosQuery,
	useGetNewIdVideoQuery,
	useHideVideoByIdMutation,
} from 'src/store/videos/videos.api'

import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { Loader } from 'src/components/loader/loader'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { GridRow } from 'src/components/grid-row/grid-row'
// import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
// import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'

import styles from './index.module.scss'

export const VideosList = () => {
	const filterValues = useAppSelector(getFiltrationValues)
	const { data: videosDataResponse, isLoading } = useGetAllVideosQuery({
		title: filterValues.title,
		date: filterValues.date,
		tags: filterValues.tags,
	})
	const { refetch: getNewId } = useGetNewIdVideoQuery({ idEvent: '', idObject: '' })
	const [deleteVideoById] = useDeleteVideoByIdMutation()
	const [hideVideoById] = useHideVideoByIdMutation()

	const navigate = useNavigate()

	const addVideo = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование', 'Дата', '']
	const formatObjectsTableData = (videosData: VideoItem[]) => {
		return videosData.map((videosEl) => {
			return {
				rowId: videosEl.id,
				cells: [
					<p
						className={cn({ 'hidden-cell-icon': videosEl.hidden }, styles.titleVideosTable)}
						key='0'
					>
						{videosEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': videosEl.hidden })} key='1'>
						{mainFormatDate(videosEl.date)}
					</p>,
					// <MainCheckBox
					// 	key='2'
					// 	checked={videosEl.key}
					// 	disabled={true}
					// 	svgNode={<CheckMarkSvg />}
					// 	className={styles.checkBoxWrapperVideos}
					// />,
					<RowController
						id={videosEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Спрятать видео'
						key='3'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (videoId: string) => {
		await deleteVideoById(videoId)
	}

	const rowHideHandler = async (id: string) => {
		await hideVideoById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/news/videos-list/${id}`)
	}

	const handleAddVideoClick = async () => {
		const newId = await addVideo()
		navigate(`/news/videos-list/${newId}`)
	}

	if (isLoading || !videosDataResponse?.videos) return <Loader />

	return (
		<>
			<h3>Видеолента</h3>
			<div>
				<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
					<TableFiltration filterInputs={VideosElementsFiltrationInputs} />
				</GridRow>
				<CustomTable
					className={styles.videosTable}
					rowData={formatObjectsTableData(videosDataResponse?.videos ?? [])}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
				/>
				<TableFooter
					totalElements={videosDataResponse?.videos.length}
					addClickHandler={handleAddVideoClick}
					addText='Добавить видео'
				/>
			</div>
		</>
	)
}
