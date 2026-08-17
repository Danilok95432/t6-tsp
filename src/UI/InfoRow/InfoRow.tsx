import { type FC, type ReactNode } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import { isNullOrEmpty } from 'src/helpers/utils'

type InfoRowProps = {
	wrapperClassname?: string
	title: string
	label: ReactNode | ReactNode[]
	titleWidth?: string
	margin?: string
}

export const InfoRow: FC<InfoRowProps> = ({
	title,
	label,
	titleWidth,
	margin,
	wrapperClassname,
}) => {
	if (isNullOrEmpty(label)) return null
	return (
		<div
			className={cn(styles.infoRow, wrapperClassname)}
			style={{ margin: `${margin ?? '0 0 10px 0'}` }}
		>
			<h6 style={{ width: `${titleWidth ?? 200}px`, minWidth: `${titleWidth ?? 200}px` }}>
				{title}
			</h6>
			{Array.isArray(label) ? (
				<ul>{label?.map((labelEl, idx) => <li key={idx}>{labelEl}</li>)}</ul>
			) : (
				<span>{label}</span>
			)}
		</div>
	)
}
