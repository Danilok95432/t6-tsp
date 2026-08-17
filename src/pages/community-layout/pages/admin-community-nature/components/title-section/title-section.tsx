import { type FC } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const TitleSection: FC = () => {
	return (
		<AdminSection>
			<QuillEditor name='topDescs' label='Текст-анонс*' $heightEditor='160px' />

			<ControlledInput
				name='articleName'
				label='Подпись под анонсом*'
				placeholder='Текст'
				margin='20px 0 20px 0'
				width='100%'
			/>
		</AdminSection>
	)
}
