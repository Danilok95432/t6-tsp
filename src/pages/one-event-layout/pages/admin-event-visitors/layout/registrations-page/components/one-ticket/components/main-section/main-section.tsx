import { type MultiSelOption, type SelOption } from 'src/types/select'
import { type FC } from 'react'
import cn from 'classnames'
import { type ImageItemWithText } from 'src/types/photos'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

type MainSectionProps = {
	galleryOptions?: SelOption[]
	photo?: ImageItemWithText[]
	photos?: ImageItemWithText[]
	chainedEvent?: SelOption[]
	chainedVids?: MultiSelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	galleryOptions,
	photo,
	photos,
	chainedVids,
	chainedEvent,
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledInput
				name='number'
				label='Номер билета (присваивается автоматически)'
				placeholder='АК4-000-000-999'
				margin='0 0 20px 0'
				className={styles.numberTicket}
			/>
			<GridRow $template='auto/700px' $width='auto'>
				<ControlledDateInput
					className={cn(adminStyles.adminDateTimeInput, styles.dateInput)}
					label='Дата и время продажи (устанавливаются автоматически при сохранении билета)'
					name='itemdateTicket'
					placeholder='гггг-мм-дд чч:мм'
					showTimeSelect
					dateFormat='yyyy-MM-dd HH:mm'
					timeFormat='HH:mm'
				/>
			</GridRow>
			<ControlledSelect
				name='type'
				label='Тип билета'
				selectOptions={chainedEvent ?? [{ label: 'Выберите тип билета', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<FlexRow className={styles.priceWrapperRow}>
				<FlexRow className={styles.priceRow}>
					<ControlledInput
						name='relatedNews'
						label='Стоимость билета'
						placeholder='0'
						margin='0 0 20px 0'
					/>
					<p>₽</p>
				</FlexRow>
				<div className={styles.inputWrapper}>
					<ControlledCheckbox
						name='use_price'
						label='Установить стоимость по типу билета'
						type='checkbox'
						className={styles.checkbox}
					/>
				</div>
			</FlexRow>
			<ControlledInput name='customer' label='Покупатель билета' margin='0 0 20px 0' />
			<ControlledInput name='phone' label='Номер телефона' margin='0 0 20px 0' />
			<ControlledInput name='email' label='E-mail' margin='0 0 20px 0' />
			<ControlledInput
				name='comment'
				label='Комментарий'
				isTextarea
				height='60px'
				margin='0 0 20px 0'
			/>
		</AdminSection>
	)
}
