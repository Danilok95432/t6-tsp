import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { CustomText } from 'src/components/custom-text/custom-text'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { InfoNewIconSVG } from 'src/UI/icons/InfoNewIconSVG'

export const MainSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='title'
					label='Название подсобытия'
					placeholder='Полное название события'
					bigFont
					margin='0 0 20px 0'
					isRequired
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='shortDesc'
					label='Короткое описание'
					placeholder='Короткое описание'
					margin='0 0 20px 0'
					height='180px'
					bigFont
					isTextarea
					isRequired
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='region'
					label='Регион и населенный пункт проведения'
					placeholder='Регион и населенный пункт проведения'
					margin='0 0 20px 0'
					height='180px'
					bigFont
					isTextarea
					isRequired
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Начало события *
			</CustomText>

			<div className={styles.inputWrapper}>
				<GridRow $template='auto/240px 240px' $width='auto'>
					<ControlledDateInput
						className={adminStyles.adminDateInput}
						name='date_from'
						dateFormat='yyyy-MM-dd'
						placeholder='гггг-мм-дд'
					/>
					<ControlledDateInput
						className={adminStyles.adminTimeInput}
						name='time_from'
						placeholder='чч.мм'
						dateFormat='HH:mm:ss'
						showTimeSelectOnly
						showTimeSelect
					/>
				</GridRow>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_date}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Окончание события *
			</CustomText>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/240px 240px' $width='auto'>
					<ControlledDateInput
						className={adminStyles.adminDateInput}
						name='date_to'
						dateFormat='yyyy-MM-dd'
						placeholder='гггг-мм-дд'
						margin='0'
					/>
					<ControlledDateInput
						className={adminStyles.adminTimeInput}
						name='time_to'
						placeholder='чч.мм'
						dateFormat='HH:mm:ss'
						showTimeSelectOnly
						showTimeSelect
						margin='0'
					/>
				</GridRow>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_date}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<GridRow $template='auto/ 0.16fr 0.3fr' $mdTemplate='1fr / 1fr' $margin='20px 0 20px 0'>
				<ControlledSelect
					label='Возрастной рейтинг'
					name='age_list'
					bigFont
					isRequired
					selectOptions={[{ label: 'Не выбрано', value: '0' }]}
				/>
				<FlexRow className={styles.selectRow}>
					<ControlledSelect
						label='Публичность события'
						name='publicity_list'
						bigFont
						isRequired
						selectOptions={[{ label: 'Не выбрано', value: '0' }]}
					/>
					<p>
						Здесь недлинное описание выбранного вида публичности, появляющееся при выборе собственно
						вида. В несколько строк, максимум, в три или, в некоторых сложных случаях, до четырех.
					</p>
				</FlexRow>
			</GridRow>
		</AdminSection>
	)
}
