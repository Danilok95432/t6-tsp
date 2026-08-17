import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { AdminSection } from 'src/components/admin-section/admin-section'

import { Tooltip } from 'src/components/tooltip/Tooltip'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { InfoVoprosSVG } from 'src/UI/icons/InfoVoprosSVG'

type SelectSectionProps = {
	controlList?: SelOption[]
	autoDopuskList?: SelOption[]
	manualDopuskList?: SelOption[]
}

export const SelectSection: FC<SelectSectionProps> = ({
	controlList = [{ label: '', value: '0' }],
	autoDopuskList = [{ label: '', value: '0' }],
	manualDopuskList = [{ label: '', value: '0' }],
}) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledSelect
					name='control_list'
					label='Применяется ли контроль допуска *'
					selectOptions={
						controlList ?? [{ label: 'да, применяется системный контроль', value: '0' }]
					}
					margin='0 0 20px 0'
					className={styles.selectWrap}
				/>

				<Tooltip text='Подсказка.' position='left' wrapperClassName={styles.tooltip}>
					<InfoVoprosSVG />
				</Tooltip>
			</div>
			<FlexRow className={styles.selectRow}>
				<div className={styles.inputWrapper}>
					<ControlledSelect
						name='auto_list'
						label='Автоматизированный допуск (турникеты) *'
						selectOptions={autoDopuskList ?? [{ label: 'да, турникеты', value: '0' }]}
						margin='0 0 20px 0'
						className={styles.selectWrap}
					/>

					<Tooltip text='Подсказка.' position='left' wrapperClassName={styles.tooltip}>
						<InfoVoprosSVG />
					</Tooltip>
				</div>
				<ControlledInput
					name='turniketsCount'
					label='Всего турникетов *'
					maxWidth='200px'
					margin='0 0 20px 0'
				/>
			</FlexRow>
			<FlexRow className={styles.selectRow}>
				<div className={styles.inputWrapper}>
					<ControlledSelect
						name='manual_list'
						label='Ручной допуск (приложение-инспектор) *'
						selectOptions={
							manualDopuskList ?? [{ label: 'только в режиме администратора', value: '0' }]
						}
						margin='0 0 20px 0'
						className={styles.selectWrap}
					/>

					<Tooltip text='Подсказка.' position='left' wrapperClassName={styles.tooltip}>
						<InfoVoprosSVG />
					</Tooltip>
				</div>
				<ControlledInput
					name='inspectorsCount'
					label='Всего инспекторов *'
					maxWidth='200px'
					margin='0 0 20px 0'
				/>
			</FlexRow>
		</AdminSection>
	)
}
