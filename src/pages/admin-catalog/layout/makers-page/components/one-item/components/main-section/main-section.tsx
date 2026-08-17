import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

type MainSectionProps = {
	parentsOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ parentsOption }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='title' label='Наименование *' margin='0 0 20px 0' />
			<ControlledInput name='country' label='Страна *' margin='0 0 20px 0' />
			<ControlledInput name='brand_link' label='Ссылка' margin='0 0 20px 0' />
			<QuillEditor
				name='brand_text'
				label='Текст для страницы'
				$heightEditor='350px'
				$maxWidth='1140px'
			/>
			<ReactDropzone
				label='Изображение'
				name='mainphoto'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='maker'
				fileImages={[]}
				className={styles.img}
			/>
		</AdminSection>
	)
}
