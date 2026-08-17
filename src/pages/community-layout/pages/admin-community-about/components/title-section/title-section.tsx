import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

import styles from './index.module.scss'

type TitleSectionProps = {
	logo?: ImageItemWithText[]
}

export const TitleSection: FC<TitleSectionProps> = ({ logo }) => {
	return (
		<AdminSection>
			<ReactDropzone
				label='Фотография'
				name='logo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px 0'
				previewVariant='sm-img'
				imgtype='about_general'
				fileImages={logo}
			/>

			<QuillEditor name='mainDescs' label='Текст-анонс*' $heightEditor='200px' />

			<div className={styles.captionWrapper}>
				<ControlledInput
					name='caption'
					label='Подпись под анонсом'
					placeholder='Текст'
					margin='0'
					width='78%'
				/>

				<ControlledCheckbox
					name='caption_show'
					type='checkbox'
					label='Показать на сайте'
					className={styles.checkBox}
				/>
			</div>
		</AdminSection>
	)
}
