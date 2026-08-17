import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'

type MainSectionProps = {
	pageOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ pageOption }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='fio' label='ФИО' margin='0 0 20px 0' />
			<QuillEditor name='comment' label='Комментарий' $heightEditor='150px' />
			<ControlledInput
				name='role'
				label='Роль'
				margin='20px 0 20px 0'
				className={styles.shortInput}
			/>
			<ControlledDateInput
				name='review_date'
				label='Дата отзыва'
				margin='0 0 20px 0'
				className={styles.dateInput}
			/>
		</AdminSection>
	)
}
