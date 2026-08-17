import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const RulesSection = () => {
	return (
		<AdminSection titleText='Правила посещения игр' className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='rule_name'
					label='Название правил *'
					placeholder='Полное название правил'
					margin='0 0 20px 0'
					maxWidth='1140px'
					className={styles.controlledFormElement}
				/>
			</div>

			<div className={styles.inputWrapper}>
				<QuillEditor name='rule_text' label='Текст *' $heightEditor='450px' $maxWidth='1140px' />
			</div>
		</AdminSection>
	)
}
