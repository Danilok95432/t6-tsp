import React, { useState, type FC, type ReactNode } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import { BottomArrowSvg } from 'src/UI/icons/bottomArrowSVG'

export type RowData = {
	rowId: string
	cells: Array<string | ReactNode>
}

type CustomTableProps = {
	colTitles?: ReactNode[]
	sortTitles?: ReactNode[]
	rowData: RowData[]
	rowClickHandler?: (id: string) => void
}

export const CustomTable: FC<CustomTableProps & React.HTMLAttributes<HTMLTableElement>> = ({
	colTitles,
	sortTitles,
	rowData,
	className,
	rowClickHandler,
	...props
}) => {
	const [activeColumns, setActiveColumns] = useState<Record<number, boolean>>({})
	return (
		<table
			{...props}
			className={cn(styles.customTable, className, { [styles._short]: rowData?.length < 3 })}
		>
			{!!colTitles && (
				<thead>
					<tr>
						{colTitles.map((title, idx) => {
							if (sortTitles?.find((el) => el === title)) {
								return (
									<th
										key={idx}
										className={styles.sortTh}
										onClick={() => {
											setActiveColumns((prev) => ({
												...prev,
												[idx]: !prev[idx],
											}))
										}}
									>
										<p>{title}</p>
										<div
											className={cn(styles.vector, {
												[styles.activeVector]: activeColumns[idx],
											})}
										>
											<BottomArrowSvg />
										</div>
									</th>
								)
							} else {
								return <th key={idx}>{title}</th>
							}
						})}
					</tr>
				</thead>
			)}

			<tbody>
				{rowData?.map((rowEl, rowIdx) => (
					<tr
						key={rowEl.rowId}
						data-idx={rowIdx + 1}
						onClick={() => rowClickHandler?.(rowEl.rowId)}
					>
						{rowEl.cells.map((cell, cellIdx) => (
							<td key={cellIdx}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
