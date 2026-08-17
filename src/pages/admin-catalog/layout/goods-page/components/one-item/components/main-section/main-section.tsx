import { type MultiSelOption, type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { ControlledMultipleSelect } from 'src/components/controlled-multiple-select/controlled-multiple-select'

type MainSectionProps = {
	sectionsOption?: SelOption[]
	typesOption?: MultiSelOption[]
	makersOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	sectionsOption,
	typesOption,
	makersOption,
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledSelect
				name='catalogs'
				label='Категория товара (раздел каталога) * '
				selectOptions={sectionsOption ?? [{ label: 'Выберите категорию', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput name='title' label='Наименование *' margin='0 0 20px 0' />
			<ControlledInput name='artikul' label='Порядок *' margin='0 0 20px 0' />
			<ControlledMultipleSelect
				name='types'
				label='Тип товара'
				selectOptions={
					typesOption ?? [
						{ label: 'Выберите тип', value: '0', selected: false },
						{ label: 'Тип 1', value: '1', selected: false },
						{ label: 'Тип 2', value: '2', selected: false },
					]
				}
				margin='0 0 20px 0'
				className={styles.select}
			/>
			<ControlledSelect
				name='brands'
				label='Производитель *'
				selectOptions={makersOption ?? [{ label: 'Выберите производителя', value: '0' }]}
				margin='0 0 20px 0'
				className={styles.select}
			/>
		</AdminSection>
	)
}
