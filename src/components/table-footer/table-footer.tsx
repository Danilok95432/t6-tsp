import { type FC } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { MainSelect } from 'src/UI/MainSelect/MainSelect'
import { PrevPaginationArrowSvg } from 'src/UI/icons/prevPaginationArrowSVG'
import { NextPaginationArrowSvg } from 'src/UI/icons/NextPaginationArrowSvg'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { DownloadTableCSV } from 'src/UI/icons/downloadTableCSV'
import { ImportBraceletsTableSVG } from 'src/UI/icons/importBraceletsTableSVG'

type TableFooterProps = {
	addText?: string
	addClickHandler?: () => void
	noAdd?: boolean
	ticketStyle?: boolean
	bigDownloadBtn?: boolean
	totalElements?: number
	currentPage?: number
	totalPages?: number
	className?: string
	downloadBtn?: boolean
	downloadHandler?: () => Promise<void>
	downloadTextBtn?: string
	importBtn?: boolean
	importHandler?: () => void
	onPageChange?: (page: number) => void
	onLimitChange?: (limit: string) => void
}

export const TableFooter: FC<TableFooterProps> = ({
	addText = 'Добавить',
	addClickHandler,
	noAdd = false,
	importBtn,
	downloadHandler,
	importHandler,
	ticketStyle = false,
	bigDownloadBtn = false,
	downloadTextBtn = 'Скачать список в CSV',
	downloadBtn = false,
	totalElements = 0,
	currentPage = 1,
	totalPages = 1,
	className,
	onPageChange,
	onLimitChange,
}) => {
	const handlePrevPage = () => {
		if (onPageChange && currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (onPageChange && currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	const handleLimitChange = (value: string) => {
		if (onLimitChange) {
			onLimitChange(value)
		}
	}
	return (
		<div className={className ?? styles.tableFooterWrapper}>
			<div className={cn(styles.tableFooter, { [styles.tableFooterShort]: downloadBtn })}>
				<div className={styles.pagination}>
					<div className={styles.paginationInfo}>
						<span>Всего элементов: {totalElements}</span>
						<FlexRow $alignItems='center' $gap='0'>
							Выводить по:
							<MainSelect
								className={styles.limitSelect}
								items={[
									{ label: '100', value: '100' },
									{ label: '50', value: '50' },
									{ label: '25', value: '25' },
									{ label: 'Все', value: 'all' },
								]}
								onChange={handleLimitChange}
							/>
						</FlexRow>
					</div>
					<div className={styles.paginationControllers}>
						<button type='button' onClick={handlePrevPage} disabled={currentPage <= 1}>
							<PrevPaginationArrowSvg />
						</button>
						<span>
							{currentPage} из {totalPages}
						</span>
						<button type='button' onClick={handleNextPage} disabled={currentPage >= totalPages}>
							<NextPaginationArrowSvg />
						</button>
					</div>
				</div>
				{downloadBtn && (
					<button
						className={cn(
							styles.downloadBtn,
							{ [styles.downloadBtnDark]: noAdd && !ticketStyle },
							{ [styles.bigDownloadBtn]: bigDownloadBtn },
						)}
						onClick={downloadHandler}
					>
						<DownloadTableCSV
							color={noAdd && !bigDownloadBtn && !ticketStyle ? '#ffffff' : '#184F71'}
						/>
						<p>{downloadTextBtn}</p>
					</button>
				)}
				{importBtn && (
					<button
						className={cn(
							styles.downloadBtn,
							{ [styles.downloadBtnDark]: noAdd && !ticketStyle },
							{ [styles.bigDownloadBtn]: bigDownloadBtn },
						)}
					>
						<ImportBraceletsTableSVG />
						<p>Импортировать список браслетов</p>
					</button>
				)}
				{!noAdd && (
					<AddButton
						className={cn({ [styles.fullAddBtn]: importBtn }, styles.tableFooterAddBtn)}
						onClick={addClickHandler}
					>
						{addText}
					</AddButton>
				)}
			</div>
		</div>
	)
}
