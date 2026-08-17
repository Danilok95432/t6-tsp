import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { FormInput } from 'src/UI/FormInput/FormInput'

export const OrgMainInfoSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='title'
					label='Полное наименование юридического лица *'
					placeholder='Форма собственности вводится полностью, без сокращений'
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
					<ControlledInput name='inn' label='ИНН *' margin='0 0 20px 0' />
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
				<div className={styles.inputWrapper}>
					<ControlledInput name='kpp' label='КПП *' margin='0 0 20px 0' />
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
			</GridRow>
			<div className={styles.inputWrapper}>
				<ControlledInput name='ogrn' label='ОГРН *' margin='0 0 40px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<FormInput name='phone' label='Номер телефона организации *' isPhone />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
