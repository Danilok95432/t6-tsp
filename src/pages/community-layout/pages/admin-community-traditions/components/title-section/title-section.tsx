import { type FC } from 'react'

import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const TitleSection: FC = () => {
	return (
		<>
			<QuillEditor name='topDescs' label='Текст-анонс*' $heightEditor='200px' />
		</>
	)
}
