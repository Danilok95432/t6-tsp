import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

type MainSectionProps = {
	categoryOption?: SelOption[]
	levelsOption?: SelOption[]
	partOption?: SelOption[]
	solutionOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	categoryOption,
	levelsOption,
	partOption,
	solutionOption,
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='title' label='Название проекта *' margin='0 0 20px 0' />
			<ControlledSelect
				name='solution'
				label='Примененное решение *'
				selectOptions={solutionOption ?? [{ label: 'Выберите категорию', value: '0' }]}
				margin='0 0 52px 0'
			/>
			<ControlledSelect
				name='part'
				label='Раздел (назначение) решения *'
				selectOptions={partOption ?? [{ label: 'Выберите категорию', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='category'
				label='Категория решения *'
				selectOptions={categoryOption ?? [{ label: 'Выберите категорию', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='level'
				label='Уровень решения *'
				selectOptions={levelsOption ?? [{ label: 'Выберите категорию', value: '0' }]}
				margin='0 0 52px 0'
			/>
		</AdminSection>
	)
}
