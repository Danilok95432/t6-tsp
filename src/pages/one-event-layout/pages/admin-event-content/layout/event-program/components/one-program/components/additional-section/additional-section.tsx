import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import cn from 'classnames'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

type AdditionalSectionProps = {
	organizatorsList?: SelOption[]
}

export const AdditionalSection: FC<AdditionalSectionProps> = ({ organizatorsList }) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='address'
					label='Адрес'
					placeholder='Адрес'
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={cn(styles.inputWrapper, styles.marginBottom)}>
				<ControlledSelect
					name='organizators_list'
					label='Организатор *'
					selectOptions={organizatorsList ?? [{ label: 'выбрать из списка', value: '0' }]}
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_teg}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<GridRow className={cn(styles.gridRow, styles.controlledFormElement)}>
					<ControlledMaskedInput
						name='phone'
						placeholder='+7'
						mask='{+7} (000) 000-00-00'
						label='Телефон'
					/>
					<ControlledInput name='telegram' label='Телеграм' placeholder='@' />
					<ControlledInput name='email' label='E-mail' placeholder='mail@mail.ru' />
				</GridRow>
			</div>
		</AdminSection>
	)
}
