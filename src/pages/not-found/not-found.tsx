import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'

export const NotFound: FC = () => (
	<main className={styles.notFound}>
		<Helmet>
			<title>Страница не найдена</title>
		</Helmet>
		<h1>
			<span>404</span> <br /> Страница не найдена &#128533;
		</h1>
		<Link to={'/'}>На главную</Link>
	</main>
)
