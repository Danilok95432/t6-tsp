import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import styles from '../../index.module.scss'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { type FC } from 'react'
import { type SelOption, type SubEventOptions } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'
import { ControlledMultipleSelect } from 'src/components/controlled-multiple-select/controlled-multiple-select'
import cn from 'classnames'

type PartSectionProps = {
	selectOptionsGroup?: SelOption[]
	selectOptionsCars?: SelOption[]
	selectOptionsLager?: SelOption[]
	subEvents?: SubEventOptions[]
}

export const PartSection: FC<PartSectionProps> = ({
	selectOptionsGroup = [{ label: 'Не выбрано', value: '0' }],
	subEvents = [
		{ label: 'Не выбрано', value: '0', selected: false, use_group: false, id_event_role: '' },
	],
}) => {
	const { control } = useFormContext()

	const useGroup = useWatch({ control, name: 'use_group' })
	const groupType = useWatch({ control, name: 'id_event_role' })

	const useSportsmen = useWatch({ control, name: 'use_sportsmen' })
	const useFolk = useWatch({ control, name: 'use_folk' })
	const useMaster = useWatch({ control, name: 'use_master' })
	const useTrader = useWatch({ control, name: 'use_trader' })
	const useJournalist = useWatch({ control, name: 'use_journalist' })
	const masterDisabled = !useMaster
	const traderDisabled = !useTrader
	const journalistDisabled = !useJournalist

	const filteredEtnoList = subEvents.filter((el) => !el.use_group && el.id_event_role === '2')

	const filteredFunList = subEvents.filter((el) => !el.use_group && el.id_event_role === '4')

	return (
		<div className={styles.formSection}>
			<h2 className={styles.title}>Участие</h2>
			<span className={styles.subtitle}>
				Обязательно выберите хотя бы один из доступных типов участия.
			</span>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_sportsmen' type='checkbox' disabled={useGroup} />
					<span>Этноспорт</span>
				</div>
				<div className={styles.footerBox}>
					<ControlledMultipleSelect
						name='sub_events_etno'
						label='Подсобытия'
						selectOptions={
							filteredEtnoList ?? [
								{
									label: 'Не выбрано',
									value: '0',
									selected: false,
									use_group: false,
									id_event_role: '',
								},
							]
						}
						placeholder='Выберите подсобытия'
						margin='0 0 10px 0'
						disabled={
							!useSportsmen ||
							(selectOptionsGroup.find((el) => el.value === groupType)?.label !==
								'Спортивная команда' &&
								useGroup)
						}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_folk' type='checkbox' disabled={useGroup} />
					<span>Фольклорная программа</span>
				</div>
				<div className={styles.footerBox}>
					<ControlledMultipleSelect
						name='sub_events_fun'
						label='Подсобытия'
						selectOptions={
							filteredFunList ?? [
								{
									label: 'Не выбрано',
									value: '0',
									selected: false,
									use_group: false,
									id_event_role: '',
								},
							]
						}
						placeholder='Выберите подсобытия'
						margin='0 0 10px 0'
						disabled={
							!useFolk ||
							(selectOptionsGroup.find((el) => el.value === groupType)?.label !==
								'Фольклорный коллектив' &&
								useGroup)
						}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBoxSpecial}>
					<ControlledCheckbox name='use_org' type='checkbox' disabled={useGroup} />
					<span>Организатор</span>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBoxSpecial}>
					<ControlledCheckbox name='use_volunteer' type='checkbox' disabled={useGroup} />
					<span>Волонтер</span>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_trader' type='checkbox' disabled={useGroup} />
					<span>Торговля на ярмарке</span>
				</div>
				<div className={styles.footerBox}>
					<div className={styles.footerBoxTrader}>
						<FormInput
							name='trader_name'
							label='Описание товаров'
							placeholder='Описание товаров'
							className={cn(styles.noMargin, styles.inputCont)}
							disabled={traderDisabled}
						/>
					</div>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_master' type='checkbox' disabled={useGroup} />
					<span>Народные промыслы и ремесла</span>
				</div>
				<div className={styles.footerBox}>
					<FormInput
						name='master_name'
						label='Название промысла'
						placeholder='Название промысла'
						className={cn(styles.noMargin, styles.inputCont)}
						disabled={masterDisabled}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_journalist' type='checkbox' disabled={useGroup} />
					<span>Журналист</span>
				</div>
				<div className={styles.footerBox}>
					<FormInput
						name='journal_name'
						label='Название издания, студии или канала'
						placeholder='Название издания, студии или канала'
						className={cn(styles.noMargin, styles.inputCont)}
						disabled={journalistDisabled}
					/>
				</div>
			</div>
		</div>
	)
}
