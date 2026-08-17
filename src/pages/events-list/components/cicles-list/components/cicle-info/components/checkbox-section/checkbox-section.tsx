import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

export const CheckBoxSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledCheckbox
					name='use_news'
					label='Включить новости цикла (транслировать новости событий)'
					type='checkbox'
					className={styles.checkbox}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledCheckbox
					name='use_video'
					label='Включить видеоленту цикла (транслировать видеоленты событий)'
					type='checkbox'
					className={styles.checkbox}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledCheckbox
					name='use_gallery'
					label='Включить галерею цикла (транслировать галереи событий)'
					type='checkbox'
					className={styles.checkbox}
				/>
			</div>
		</AdminSection>
	)
}
