import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const ReqSection = () => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='customer' label='Заказчик проекта *' margin='0 0 20px 0' />
			<ControlledInput
				name='finalPrice'
				label='Финальная стоимость проекта *'
				margin='0 0 52px 0'
			/>
			<ControlledInput name='short' label='Краткое описание' isTextarea margin='0 0 20px 0' />
			<QuillEditor
				name='full'
				label='Полное описание страницы'
				$heightEditor='150px'
				$maxWidth='1140px'
			/>
		</AdminSection>
	)
}
