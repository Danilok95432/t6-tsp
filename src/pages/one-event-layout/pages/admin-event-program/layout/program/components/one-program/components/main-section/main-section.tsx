import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import styles from './index.module.scss'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

export const MainSection = () => {
	return (
		<AdminSection isBlock={false}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='title'
					label='Название подсобытия *'
					placeholder='Полное название подсобытия'
					margin='0 0 20px 0'
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledCheckbox
					name='use_real'
					label='Реальное подсобытие'
					type='checkbox'
					className={styles.checkbox}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledDateInput
					className={adminStyles.adminDateInput}
					label='Дата *'
					name='itemdate'
					dateFormat='yyyy-MM-dd'
					placeholder='гггг-мм-дд'
				/>
			</div>
			<GridRow $template='auto/205px 205px 60px' $width='auto' $gap='15px'>
				<ControlledDateInput
					className={adminStyles.adminDateInput}
					label='Начало подсобытия *'
					name='begin_time'
					placeholder='чч.мм'
					dateFormat='HH:mm:ss'
					showTimeSelectOnly
					showTimeSelect
				/>
				<ControlledDateInput
					className={adminStyles.adminTimeInput}
					label='Окончание подсобытия *'
					name='end_time'
					placeholder='чч.мм'
					dateFormat='HH:mm:ss'
					showTimeSelectOnly
					showTimeSelect
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltipSpecial}>
					<InfoIconSvg />
				</Tooltip>
			</GridRow>
			<div className={styles.inputWrapper}>
				<ControlledCheckbox
					name='use_end_time'
					label='Отображать время окончания'
					type='checkbox'
					className={styles.checkbox}
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='place' label='Локация *' placeholder='Название локации' />

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
