import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'

export const MainSection = () => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			{/* <ControlledSelect
				name='parent'
				label='Раздел-родитель *'
				selectOptions={parentsOption ?? [{ label: 'Выберите раздел', value: '0' }]}
				margin='0 0 20px 0'
			/> */}
			<ControlledInput name='title' label='Наименование типа товара *' margin='0 0 20px 0' />
		</AdminSection>
	)
}
