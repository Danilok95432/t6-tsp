import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import styles from './index.module.scss'

export const MainBlocksSection = () => {
	return (
		<AdminSection className={styles.mainBlocksSection} noBorder>
			<h2>Блоки главной страницы</h2>
			<ControlledCheckbox
				name='use_promo'
				label='Показать блок «Промо» (главный рекламный блок)'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_big'
				label='Показать блок «Для крупного и среднего бизнеса»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_small'
				label='Показать блок «Для малого бизнеса и частных клиентов»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_projects'
				label='Показать блок «Проекты» (слайдер с несколькими проектами)'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_prof'
				label='Показать блок «Профессионалы»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_docs'
				label='Показать блок «Документы»'
				$margin='0 0 20px 0'
				type='checkbox'
			/>
			<ControlledCheckbox
				name='use_contacts'
				label='Показать блок «Контакты и карта»'
				type='checkbox'
				$margin='0 0 20px 0'
			/>
		</AdminSection>
	)
}
