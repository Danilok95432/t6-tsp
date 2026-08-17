import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import cn from 'classnames'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

import styles from './index.module.scss'

type MainSectionProps = {
	typeList?: SelOption[]
	organizatorsList?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ typeList, organizatorsList }) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='cicle_name'
					label='Название площадки *'
					placeholder='Полное название площадки'
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='publicity'
					label='Публичность *'
					disabled
					selectOptions={typeList ?? [{ label: 'Только этот организатор', value: '0' }]}
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='left' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={cn(styles.inputWrapper, styles.marginBottom)}>
				<ControlledSelect
					name='organizators_list'
					label='Организатор *'
					disabled
					selectOptions={organizatorsList ?? [{ label: 'Название организатора', value: '0' }]}
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_teg}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={cn(styles.inputWrapper, styles.marginBottom)}>
				<ControlledSelect
					name='region_list'
					label='Регион *'
					selectOptions={organizatorsList ?? [{ label: 'регион не выбран', value: '0' }]}
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_teg}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={cn(styles.inputWrapper, styles.marginBottom, styles.inputStart)}>
				<ControlledInput
					name='adress'
					label='Адрес площадки *'
					placeholder='Адрес площадки'
					isTextarea
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_teg}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
