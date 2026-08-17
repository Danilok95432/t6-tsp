import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

export const ArticleSection: FC = () => {
	return (
		<AdminSection titleText='Основная статья' sectionName='bottomDescsSection'>
			<QuillEditor name='bottomDescs' label='Текст статьи*' $heightEditor='300px' />
		</AdminSection>
	)
}
