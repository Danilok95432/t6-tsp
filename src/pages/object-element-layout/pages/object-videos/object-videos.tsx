import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Container } from 'src/UI/Container/Container'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { VideosElements } from './components/videos-elements/videos-elements'

export const ObjectVideos = () => {
	return (
		<>
			<Helmet>
				<title>Видеолента</title>
			</Helmet>
			<AdminContent $padding='0' $backgroundColor='#ffffff'>
				<Container $padding='35px' $paddingMobile='35px'>
					<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLink}>
						Возврат к списку объектов
					</Link>
					<h3 className={styles.title}>Видеолента</h3>
				</Container>
				<VideosElements />

				<Container $padding='20px 35px' $paddingMobile='50px 35px' $position='unset'>
					<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLinkAbs}>
						Возврат к списку объектов
					</Link>
				</Container>
			</AdminContent>
		</>
	)
}
