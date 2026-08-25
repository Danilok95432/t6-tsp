import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type ImageItemWithText } from 'src/types/photos'

type MainSectionProps = {
	parentsOption?: SelOption[]
	img?: ImageItemWithText[]
	imgInside?: ImageItemWithText[]
}

export const MainSection: FC<MainSectionProps> = ({ parentsOption, img, imgInside }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='title' label='Наименование категории *' margin='0 0 20px 0' />
			<ControlledSelect
				name='parent'
				label='Раздел-родитель'
				selectOptions={parentsOption ?? [{ label: 'Выберите раздел', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='main_button'
				label='Текст для кнопки на главной (стандартный если не указать)'
				margin='0 0 20px 0'
			/>
			<QuillEditor
				name='short'
				label='Краткое описание категории'
				$heightEditor='150px'
				$maxWidth='1140px'
				className={styles.area}
			/>
			<QuillEditor
				name='full'
				label='Полное описание категории'
				$heightEditor='350px'
				$maxWidth='1140px'
				className={styles.area}
			/>
			<ReactDropzone
				label='Изображение (305x286)'
				name='img'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='catalog'
				fileImages={img}
				className={styles.img}
			/>
			<ReactDropzone
				label='Картинка внутри раздела (485x285)'
				name='img_inside'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='catalog_inside'
				fileImages={imgInside}
				className={styles.img}
			/>
		</AdminSection>
	)
}
