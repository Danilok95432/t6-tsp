import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { type ImageItemWithText } from 'src/types/photos'

type MainSectionProps = {
	parentsOption?: SelOption[]
	img?: ImageItemWithText[]
	imgInside?: ImageItemWithText[]
}

export const MainSection: FC<MainSectionProps> = ({ parentsOption, img, imgInside }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='title' label='Наименование уровня*' margin='0 0 20px 0' />
			<ControlledInput
				name='short'
				label='Краткое описание уровня'
				margin='0 0 20px 0'
				isTextarea
				height='58px'
			/>
			<QuillEditor
				name='full'
				label='Полное описание для страницы'
				$heightEditor='350px'
				$maxWidth='1140px'
				className={styles.area}
			/>
		</AdminSection>
	)
}
