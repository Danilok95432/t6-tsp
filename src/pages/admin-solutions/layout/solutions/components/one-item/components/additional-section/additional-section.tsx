import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const AdditionalSection = () => {
	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Дополнительно'
			titleStyleClass={styles.title}
		>
			<ControlledInput
				name='item_desc'
				label='Состав через запятую'
				margin='0 0 20px 0'
				isTextarea
				height='58px'
			/>
			<ControlledInput name='package' label='Упаковка' margin='0 0 20px 0' />
			<ControlledInput name='item_price' label='Цена' margin='0 0 20px 0' isSum />
			<ControlledInput
				name='item_price_discount'
				label='Скидочная цена'
				margin='0 0 20px 0'
				isSum
			/>
			<ControlledInput name='short' label='Краткое описание' margin='0 0 20px 0' />
			<QuillEditor
				name='full'
				label='Текст для страницы'
				$heightEditor='150px'
				$maxWidth='1140px'
				className={styles.area}
			/>
		</AdminSection>
	)
}
