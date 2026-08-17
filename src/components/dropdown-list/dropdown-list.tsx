import { useState, type FC } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'
import { BottomArrowSvg } from 'src/UI/icons/bottomArrowSVG'

type DropdownListProps = {
	label: string
	list: string[]
}

export const DropdownList: FC<DropdownListProps> = ({ label, list }) => {
	const [active, setActive] = useState<boolean>(false)
	return (
		<div className={styles.dropdownList}>
			<FlexRow className={cn(styles.labelRow, { [styles.activeLabelRow]: active })}>
				<p
					className={cn(styles.label, { [styles.activeLabel]: active })}
					onClick={() => setActive(!active)}
				>
					{label}
				</p>
				<div
					className={cn(styles.vector, { [styles.activeVector]: active })}
					onClick={() => setActive(!active)}
				>
					<BottomArrowSvg />
				</div>
			</FlexRow>
			<div className={styles.listWrapper}>
				<ul className={cn(styles.list, { [styles.activeList]: active })}>
					{list.map((el, index) => (
						<li key={index}>{el}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
