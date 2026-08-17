import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

type MainSectionProps = {
	pageOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ pageOption }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput
				name='page_name'
				label='Название информационной страницы'
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='parents'
				label='Связаная страница на сайте'
				selectOptions={pageOption ?? [{ label: 'Выберите тип', value: '0' }]}
				margin='0 0 36px 0'
				className={styles.select}
			/>
			<QuillEditor name='page_text' label='Основной текст страницы' $heightEditor='150px' />
		</AdminSection>
	)
}
