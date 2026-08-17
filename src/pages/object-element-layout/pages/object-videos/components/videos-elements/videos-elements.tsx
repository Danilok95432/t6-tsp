import { useNavigate, useParams } from 'react-router-dom'
import { GridRow } from 'src/components/grid-row/grid-row'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { mainFormatDate } from 'src/helpers/utils'
import cn from 'classnames'
import {
	useDeleteVideoByIdMutation,
	useGetAllVideosQuery,
	useGetNewIdVideoQuery,
	useHideVideoByIdMutation,
} from 'src/store/videos/videos.api'

import { type VideoItem } from 'src/types/videos'
import { ObjectVideosFiltrationInputs } from './consts'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { RowController } from 'src/components/row-controller/row-controller'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { Loader } from 'src/components/loader/loader'

import styles from './index.module.scss'

export const VideosElements = () => {
	const { id } = useParams()
	const { data: objVideos, isLoading } = useGetAllVideosQuery({ idObject: id })
	const { refetch: getNewId } = useGetNewIdVideoQuery({ idEvent: '', idObject: '' })
	const [deleteVideoById] = useDeleteVideoByIdMutation()
	const [hideVideoById] = useHideVideoByIdMutation()

	console.log(objVideos)

	const navigate = useNavigate()

	const addVideo = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['Наименование', 'Дата', 'Теги', 'Ключевая', '']
	const formatObjectsTableData = (videosData: VideoItem[]) => {
		return videosData.map((videoEl) => {
			return {
				rowId: videoEl.id,
				cells: [
					<p
						className={cn({ 'hidden-cell-icon': videoEl.hidden }, styles.titleVideosTable)}
						key='0'
					>
						{videoEl.title}
					</p>,
					<p className={cn({ 'hidden-cell': videoEl.hidden })} key='1'>
						{mainFormatDate(videoEl.date)}
					</p>,
					<p className={cn({ 'hidden-cell': videoEl.hidden })} key='2'>
						{videoEl.tags}
					</p>,
					<MainCheckBox
						key='3'
						checked={videoEl.hidden}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperObjectVideos}
					/>,
					<RowController
						id={videoEl.id}
						hideHandler={rowHideHandler}
						removeHandler={rowDeleteHandler}
						textOfHidden='Скрыть видео'
						key='4'
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

	if (isLoading || !objVideos?.videos) return <Loader />

	return (
		<div className={styles.objectVideosContainer}>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={ObjectVideosFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.videosTable}
				rowData={formatObjectsTableData(objVideos?.videos ?? [])}
				rowClickHandler={rowClickHandler}
				colTitles={tableTitles}
			/>
			<TableFooter
				totalElements={objVideos?.videos.length}
				addClickHandler={handleAddVideoClick}
				addText='Добавить видео'
			/>
		</div>
	)
}
