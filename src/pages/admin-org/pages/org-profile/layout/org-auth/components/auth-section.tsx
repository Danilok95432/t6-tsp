import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'

export const AuthSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<FlexRow className={styles.adminRow}>
				<div className={styles.inputWrapper}>
					<ControlledInput name='login' label='Логин (номер телефона) *' locked disabled />
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
				<p className={styles.disclaimer}>
					Для того, чтобы сменить номер телефона, указанный в качестве логина,{' '}
					<a href='/'>обратитесь к администратору</a>
				</p>
			</FlexRow>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='password'
					label='Пароль (укажите, если хотите сменить) *'
					type='password'
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='repeatPassword'
					label='Повторите пароль *'
					type='password'
					margin='0 0 40px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<FormInput name='publicPhone' label='Публичный номер телефона' isPhone />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='website' label='Интернет-сайт' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='email' label='Электронная почта' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='tg' label='Канал Телеграм' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='vk' label='Группа ВКонтакте' margin='0 0 20px 0' />
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
