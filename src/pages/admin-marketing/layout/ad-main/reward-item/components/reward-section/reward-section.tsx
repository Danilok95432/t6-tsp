import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { type SelOption } from 'src/types/select'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type ImageItemWithText } from 'src/types/photos'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'

type RewardSectionProps = {
	number?: number
	colorOptions?: SelOption[]
	img?: ImageItemWithText[]
}

export const RewardSection: FC<RewardSectionProps> = ({ number = 0, colorOptions, img }) => {
	return (
		<AdminSection className={styles.adSection} isBlock={false} noBorder>
			<ControlledInput name={`title`} label='Название награды' margin='0 0 20px 0' />
			<ControlledSelect
				name={`colors_list`}
				className={styles.select}
				label='Цвет названия награды'
				selectOptions={colorOptions ?? [{ label: 'Бронза', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<QuillEditor
				name={`itemname`}
				label='Основной текст'
				$heightEditor='150px'
				className={styles.editor}
			/>
			<ControlledInput
				name={`itemdesc`}
				label='Название конкурса'
				margin='0 0 20px 0'
				isTextarea
				height='77px'
			/>
			<ReactDropzone
				label='Изображение 60x60'
				name='img'
				prompt='PNG, JPG, JPEG. 60 х60px, не более 1 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='award'
				fileImages={img}
				className={styles.img}
			/>
		</AdminSection>
	)
}
