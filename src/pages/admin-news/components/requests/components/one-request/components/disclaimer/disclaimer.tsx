import styles from './index.module.scss'

export const Disclaimer = () => {
	return (
		<div className={styles.disclaimer}>
			<p>
				<span className={styles.attention}>Внимание!</span>{' '}
				<span className={styles.boldText}>
					Подача заявки не означает автоматической публикации!
				</span>{' '}
				Сначала заявку должен одобрить главный редактор сайта.
				<br /> Подайте заявку на публикацию новости или видеозаписи на основном сайте кластера
				«Атманов угол».
			</p>
		</div>
	)
}
