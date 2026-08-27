import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

type MainSectionProps = {
	categoryOption?: SelOption[]
	levelsOption?: SelOption[]
	solutionOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	categoryOption,
	levelsOption,
	solutionOption,
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput name='title' label='Наименование решения*' margin='0 0 20px 0' />
			<ControlledSelect
				name='solution'
				label='Раздел (назначение) решения *'
				selectOptions={solutionOption ?? [{ label: 'Выберите категорию', value: '0' }]}
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
				margin='0 0 20px 0'
			/>
			<ControlledInput name='code' label='Код решения *' margin='0 0 20px 0' />
		</AdminSection>
	)
}
