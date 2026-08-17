import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

export const OrgAdditionalInfoSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='bank'
					label='Банк *'
					placeholder='Банк'
					margin='0 0 20px 0'
					height='80px'
					isTextarea
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<GridRow>
				<div className={styles.inputWrapper}>
					<ControlledInput name='bik' label='БИК *' margin='0 0 20px 0' />
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
			</GridRow>
			<div className={styles.inputWrapper}>
				<ControlledInput name='rachet' label='Расчетный счет *' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='korchet' label='Корсчет счет *' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='boss'
					label='Должность руководителя *'
					selectOptions={[{ label: 'Генеральный директор', value: '0' }]}
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='fio'
					label='Фамилия, имя, отчество руководителя *'
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
