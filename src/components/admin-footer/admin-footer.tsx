import { Container } from 'src/UI/Container/Container'

import styles from './index.module.scss'

export const AdminFooter = () => {
	return (
		<footer className={styles.adminFooter}>
			<Container className={styles.footerContainer} $padding='0 30px 0 301px'>
				<p className={styles.footerCompany}>© НПО ТАУ 2024-2026</p>
				<div className={styles.footerBottom}>
					<p>
						Авторы и разработчики Сайта не несут ответственности за контент, размещенный
						пользователями Сайта
					</p>

					<div className={styles.footerLinks}>
						<a href='#'>Правила и условия</a>
						<a href='#'>Соглашение об обработке персональных данных</a>
						<a href='#'>Раскрытие информации</a>
					</div>
				</div>
			</Container>
		</footer>
	)
}
