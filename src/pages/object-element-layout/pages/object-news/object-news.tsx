import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { NewsElements } from './components/news-elements/news-elements'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { Container } from 'src/UI/Container/Container'

import styles from './index.module.scss'

export const ObjectNews = () => {
	return (
		<>
			<Helmet>
				<title>Новости</title>
			</Helmet>
			<AdminContent $padding='0' $backgroundColor='#ffffff'>
				<Container $padding='35px' $paddingMobile='35px'>
					<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLink}>
						Возврат к списку объектов
					</Link>
					<h3 className={styles.title}>Новости</h3>
				</Container>
				<NewsElements />
				<Container $padding='20px 35px' $paddingMobile='50px 35px' $position='unset'>
					<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLinkAbs}>
						Возврат к списку объектов
					</Link>
				</Container>
			</AdminContent>
		</>
	)
}
