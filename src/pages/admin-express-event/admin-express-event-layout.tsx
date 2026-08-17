import { Outlet } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { TabNavigation } from 'src/components/tab-navigation/tab-navigation'
import { expressTabs } from './consts'
import { Container } from 'src/UI/Container/Container'
import { ExpressEventTitleSVG } from 'src/UI/icons/expressEventTitleSVG'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { CustomDisclaimer } from 'src/components/custom-disclaimer/custom-disclaimer'

export const AdminExpressEventLayout = () => {
	return (
		<>
			<div className={adminStyles.adminTitleTab}>
				<FlexRow className={styles.titleRow}>
					<h1>Экспресс-событие</h1>
					<ExpressEventTitleSVG />
				</FlexRow>
			</div>
			<AdminContent className={styles.newsContent} $backgroundColor='#ffffff' $padding='30px 0'>
				<Container $padding='0px 35px 0 35px' $paddingMobile='35px'>
					<FlexRow className={styles.navRow}>
						<CustomDisclaimer closable>
							<p>
								Следуя инструкциям этого раздела Вы сможете быстро создать событие на основе
								стандартных настроек. Для того, чтобы использовать расширенные настройки, перейдите
								в профиль события после завершения первого шага.
							</p>
						</CustomDisclaimer>
						<TabNavigation navItems={expressTabs} variant='express' />
					</FlexRow>
					<Outlet />
				</Container>
			</AdminContent>
		</>
	)
}
