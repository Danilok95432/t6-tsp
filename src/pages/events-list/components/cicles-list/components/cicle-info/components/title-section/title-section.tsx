import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import cn from 'classnames'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'

type TitleSectionProps = {
	typeList?: SelOption[]
	organizatorsList?: SelOption[]
}

export const TitleSection: FC<TitleSectionProps> = ({ typeList, organizatorsList }) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='cicle_name'
					label='Название цикла *'
					placeholder='Полное название цикла'
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='id_cicle_type'
					label='Основной тип событий цикла *'
					selectOptions={typeList ?? [{ label: 'Не выбрано', value: '0' }]}
					margin='0 0 20px 0'
					className={styles.controlledFormElement}
				/>

				<Tooltip text='Подсказка' position='left' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={styles.inputWrapper}>
				<ControlledDateInput
					className={adminStyles.adminDateInput}
					name='cicle_dates'
					dateFormat='yyyy-MM-dd'
					placeholder='гггг-мм-дд'
					label='Год начала цикла'
				/>
				<Tooltip text='Подсказка' position='left' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='place'
					label='Адрес *'
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
						label='Телефон *'
					/>
					<ControlledInput name='telegram' label='Телеграм *' placeholder='@' />
					<ControlledInput name='email' label='E-mail *' placeholder='mail@mail.ru' />
				</GridRow>
			</div>
		</AdminSection>
	)
}
