import { type FC } from 'react'

import { AdminContent } from 'src/components/admin-content/admin-content'

import { Link } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { Helmet } from 'react-helmet-async'
import { Container } from 'src/UI/Container/Container'
import { EventNewsList } from './components/news-elements/event-news'

export const AdminEventNews: FC = () => {
	return (
		<>
			<Helmet>
				<title>Новости</title>
			</Helmet>
			<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.eventNewsPage}>
				<EventNewsList />
				<Container $padding='20px 35px' $paddingMobile='50px 35px' $position='unset'>
					<Link
						to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
						className={adminStyles.adminReturnLinkAbs}
					>
						Возврат к списку событий
					</Link>
				</Container>
			</AdminContent>
		</>
	)
}
