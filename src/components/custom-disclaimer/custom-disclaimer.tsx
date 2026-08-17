import { AdminPromptIconSvg } from 'src/UI/icons/adminPromptIconSVG'
import { FlexRow } from '../flex-row/flex-row'
import styles from './index.module.scss'
import { useState, type FC, type ReactNode } from 'react'
import { CloseSvg } from 'src/UI/icons/closeSVG'
import cn from 'classnames'

type CustomDisclaimerProps = {
	children: ReactNode
	closable?: boolean
	className?: string
}

export const CustomDisclaimer: FC<CustomDisclaimerProps> = ({
	children,
	closable = false,
	className,
}) => {
	const [close, setClose] = useState<boolean>(false)
	return (
		<FlexRow className={cn(styles.disclaimer, { [styles.close]: close }, className)}>
			<FlexRow className={styles.textRow}>
				{!close && <AdminPromptIconSvg />}
				<div className={styles.content}>{children}</div>
			</FlexRow>
			<div className={styles.closeVector} onClick={() => setClose(true)}>
				{closable && <CloseSvg />}
			</div>
		</FlexRow>
	)
}
