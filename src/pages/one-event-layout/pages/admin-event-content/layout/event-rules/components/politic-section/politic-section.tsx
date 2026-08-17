import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const PoliticSection = () => {
	return (
		<AdminSection
			titleText='Политика защиты и обработки персональных данных'
			className={styles.titleSectionInner}
		>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='politic_name'
					label='Название *'
					placeholder='Полное название политики'
					margin='0 0 20px 0'
					maxWidth='1140px'
					className={styles.controlledFormElement}
				/>
			</div>

			<div className={styles.inputWrapper}>
				<QuillEditor name='politic_text' label='Текст *' $heightEditor='450px' $maxWidth='1140px' />
			</div>
		</AdminSection>
	)
}
