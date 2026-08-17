import { AdminSection } from 'src/components/admin-section/admin-section'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { type ImageItemWithText } from 'src/types/photos'
import { type FC } from 'react'

type DescSectionProps = {
	photo?: ImageItemWithText[]
}

export const DescSection: FC<DescSectionProps> = ({ photo }) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='short'
					label='Описание подсобытия *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textArea}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='rules'
					label='Краткие правила *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textArea}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ReactDropzone
					label='Основное изображение'
					name='photo'
					prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
					accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
					margin='20px 0 20px 0'
					previewVariant='sm-img'
					imgtype='sub_events'
					fileImages={photo}
					isProgram
				/>
			</div>
		</AdminSection>
	)
}
