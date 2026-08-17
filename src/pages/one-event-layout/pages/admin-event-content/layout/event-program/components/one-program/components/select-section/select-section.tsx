import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import styles from './index.module.scss'
import { GridRow } from 'src/components/grid-row/grid-row'

type SelectSectionProps = {
	ageList?: SelOption[]
	vidList?: SelOption[]
	regList?: SelOption[]
}

export const SelectSection: FC<SelectSectionProps> = ({ ageList, vidList, regList }) => {
	return (
		<AdminSection isBlock={false}>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Возрастной рейтинг *'
							name='age_list'
							selectOptions={ageList ?? [{ label: 'Не выбрано', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Вид подсобытия *'
							name='vids_list'
							selectOptions={vidList ?? [{ label: 'Не выбрано', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Регистрация *'
							name='reg_list'
							selectOptions={regList ?? [{ label: 'Нет', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
		</AdminSection>
	)
}
