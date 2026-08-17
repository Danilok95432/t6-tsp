import { useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { RequestsTable } from './components/requests-table/requests-table'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AddSupportRequestSVG } from 'src/UI/icons/addSupportRequestSVG'

import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { AddSupportRequestModal } from 'src/modals/add-support-request-modal/add-support-request-modal'

export const AdminSupport: FC = () => {
	const { openModal } = useActions()
	const [active, setActive] = useState<boolean>(false)
	const status = 'org'
	return (
		<>
			<Helmet>
				<title>Поддержка</title>
			</Helmet>
			<FlexRow className={styles.supportRow}>
				<h1>
					{status === 'org'
						? 'Поддержка организатора'
						: 'Поддержка организатора (оператор поддержки)'}
				</h1>
				{status === 'org' && (
					<AdminButton
						className={styles.addBtn}
						onMouseEnter={() => setActive(true)}
						onMouseLeave={() => setActive(false)}
						onClick={() => {
							openModal(<AddSupportRequestModal />)
						}}
					>
						<AddSupportRequestSVG active={active} />
						Новое обращение
					</AdminButton>
				)}
			</FlexRow>
			<AdminContent $padding='0' $backgroundColor='#ffffff'>
				<RequestsTable />
			</AdminContent>
		</>
	)
}
