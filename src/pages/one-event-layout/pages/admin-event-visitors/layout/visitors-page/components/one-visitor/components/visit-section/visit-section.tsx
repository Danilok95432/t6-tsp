import { useFormContext, useWatch } from 'react-hook-form'
import styles from '../../index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { CarsFields } from './components/car-fields/car-fields'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'
import cn from 'classnames'

type VisitSectionProps = {
	selectOptionsLager?: SelOption[]
	selectOptionsCars?: SelOption[]
}

export const VisitSection: FC<VisitSectionProps> = ({
	selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
}) => {
	const { control } = useFormContext()

	const useCar = useWatch({ control, name: 'use_car' })
	const useLager = useWatch({ control, name: 'use_lager' })

	const carDisabled = !useCar
	const lagerDisabled = !useLager

	return (
		<div className={styles.formSection}>
			<h2 className={styles.title}>Посещение</h2>

			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_car' type='checkbox' />
					<span>Гость на машине, нужна парковка</span>
				</div>
				<div className={styles.footerBox}>
					<FlexRow className={styles.groupInputsStart}>
						<FormInput
							name='cars_count'
							label='Кол-во'
							className={cn(styles.shortInput, styles.inputCont)}
							disabled={carDisabled}
						/>
						<div className={styles.carsList}>
							<CarsFields disabled={carDisabled} selectOptionsCars={selectOptionsCars} />
						</div>
					</FlexRow>
				</div>
			</div>

			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_lager' type='checkbox' />
					<span>Нужно место в палаточном лагере</span>
				</div>
				<div className={styles.footerBox}>
					<FlexRow className={styles.groupInputs}>
						<ControlledSelect
							className={styles.selectForm}
							name='id_lager_type'
							selectOptions={selectOptionsLager}
							disabled={lagerDisabled}
							label='Лагерь'
						/>
						<FormInput
							name='lager_count'
							label='Всего палаток (1 шатер равен 3 палаткам)'
							className={cn(styles.noMargin, styles.inputCont)}
							disabled={lagerDisabled}
							isSmallLabel={true}
						/>
					</FlexRow>
				</div>
			</div>
		</div>
	)
}
