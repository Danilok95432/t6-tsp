import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import styles from './index.module.scss'

export const DescSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.descSection}>
			<ControlledInput
				name='short'
				label='Краткое описание (хранится в базе, предназначено для редактора)'
				isTextarea
				height='78px'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='title'
				label='Выбор новости или видеозаписи'
				placeholder='Начните вводить название новости или видеозаписи'
				margin='0 0 20px 0'
			/>
			<p>
				Здесь появится список из созданных Вами новостей и видеозаписей.
				<br /> Для того, чтобы выбрать нужную, начните вводить ее название и выберите один из
				предложенных вариантов.
			</p>
		</AdminSection>
	)
}
