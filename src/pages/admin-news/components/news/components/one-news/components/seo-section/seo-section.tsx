import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import styles from './index.module.scss'

export const SeoSection = () => {
	return (
		<AdminSection className={styles.seoSection} isBlock={false}>
			<h5 className={styles.seoSectionTitle}>SEO (продвижение сайта)</h5>
			<ControlledInput
				name='description'
				label='Введите описание (description)'
				placeholder='Описание'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='keywords'
				label='Введите ключевые слова (keywords)'
				placeholder='Введите ключевые слова (keywords)'
				margin='0'
			/>
		</AdminSection>
	)
}
