import { type FC } from 'react'
import { type SelOption } from 'src/types/select'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

import styles from './index.module.scss'

type MainSectionProps = {
	chapterOptions?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ chapterOptions }) => {
	return (
		<AdminSection isBlock={false} className={styles.oneQuestionInputsSection}>
			<ControlledSelect
				name='chapter'
				label='Выберите раздел'
				selectOptions={chapterOptions ?? [{ label: 'Не выбран', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='title'
				label='Введите вопрос *'
				placeholder='Введите вопрос'
				maxWidth='1140px'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='content'
				label='Введите ответ *'
				placeholder='Введите ответ'
				maxWidth='1140px'
				height='78px'
				isTextarea
				margin='0 0 40px 0'
			/>
		</AdminSection>
	)
}
