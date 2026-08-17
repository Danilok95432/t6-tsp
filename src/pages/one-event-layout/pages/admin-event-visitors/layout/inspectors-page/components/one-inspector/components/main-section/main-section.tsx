import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { FormInput } from 'src/UI/FormInput/FormInput'
import cn from 'classnames'

type MainSectionProps = {
	inspectorTypesList?: SelOption[]
	inspectorPitaniePlace?: SelOption[]
	inspectorEnterZones?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	inspectorTypesList = [{ label: 'Выберите из списка', value: '0' }],
	inspectorPitaniePlace = [{ label: 'Выберите из списка', value: '0' }],
	inspectorEnterZones = [{ label: 'Выберите из списка', value: '0' }],
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<h2 className={styles.title}>Инспектор</h2>
			<div className={cn(styles.inputWrapper, styles.formInputWrapper)}>
				<FormInput
					name='fio'
					label='ФИО инспектора *'
					placeholder='ФИО'
					is_select
					className={styles.noMargin}
				/>
				<span>Начните вводить фамилию и выберите из найденных вариантов.</span>
			</div>
			<div className={styles.inputWrapper}>
				<FormInput
					name='telphone'
					label='Номер телефона *'
					placeholder='Номер телефона'
					isPhone
					className={styles.noMargin}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='description'
					label='Описание или комментарий'
					placeholder='Описание или комментарий'
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='inspector_enter_zones'
					label='Пропускные зоны'
					selectOptions={inspectorEnterZones ?? [{ label: 'Выберите из списка', value: '0' }]}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='inspector_pitanie_place'
					label='Точка сервиса'
					selectOptions={inspectorPitaniePlace ?? [{ label: 'Выберите из списка', value: '0' }]}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='inspector_types_list'
					label='Тип инспектора'
					selectOptions={inspectorTypesList ?? [{ label: 'Выберите из списка', value: '0' }]}
				/>
			</div>
			<GridRow $template='auto/1fr 1fr' $width='auto' $alignItems='start' $margin='0 0 20px 0'>
				<ControlledInput name='user_name' label='Логин инспектора' placeholder='Логин инспектора' />
				<div className={styles.inputWrapper}>
					<ControlledInput name='user_pass' label='Пароль' type='password' placeholder='****' />
					<span>Вводите для изменения!</span>
				</div>
			</GridRow>
		</AdminSection>
	)
}
