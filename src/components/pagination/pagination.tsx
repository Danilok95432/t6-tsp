import { type FC, useState } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type PaginationProps = {
	pagesCount: number
	activePage: number
	className?: string
	activeCountClass?: string
}

export const Pagination: FC<PaginationProps> = ({
	pagesCount,
	activePage,
	className,
	activeCountClass,
}) => {
	const [pageNumber, setPageNumber] = useState<number>(activePage)
	return (
		<>
			<ul className={cn(styles.pagination, className)}>
				<li
					onClick={() => {
						setPageNumber(0)
					}}
				>
					в начало
				</li>
				{Array(pagesCount)
					.fill(null)
					.map((count, idx) => (
						<li
							className={cn({
								[activeCountClass ?? styles.activeCount]: pageNumber === idx,
							})}
							key={idx}
							onClick={() => setPageNumber(idx)}
						>
							{idx + 1}
						</li>
					))}

				<li
					onClick={() => {
						if (pageNumber === pagesCount - 1) return
						setPageNumber(pageNumber + 1)
					}}
				>
					дальше
				</li>
			</ul>
		</>
	)
}
