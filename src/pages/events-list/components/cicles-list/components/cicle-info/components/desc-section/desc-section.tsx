import { AdminSection } from 'src/components/admin-section/admin-section'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const DescSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapperTextArea}>
				<QuillEditor
					name='anonstext'
					label='Краткое описание *'
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
					name='fulltext'
					label='Подробное описание *'
					$heightEditor='150px'
					$maxWidth='1140px'
					$width='1140px'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_textArea}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
