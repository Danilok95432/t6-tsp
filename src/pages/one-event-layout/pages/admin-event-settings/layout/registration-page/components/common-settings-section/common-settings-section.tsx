import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { CustomText } from 'src/components/custom-text/custom-text'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const CommonSettingsSection = () => {
	return (
		<AdminSection titleText='Общие настройки' fullSection>
			<ControlledInput
				name='guestsLimit'
				label='Гостей не более'
				margin='0 0 20px 0'
				className={styles.guestInput}
			/>
			<FlexRow className={styles.settingElem}>
				<CustomText $margin='0 0 12px 0' $fontWeight='600' $fontSize={'16px'}>
					Повторная регистрация
				</CustomText>
				<FlexRow className={styles.customCheck}>
					<ControlledCheckbox className={styles.checkBox} name='use_repeat_reg' type={'checkbox'} />
					<FlexRow className={styles.customLabel}>
						<p>Разрешить повторную регистрацию с ограничением</p>
						<ControlledInput name='repeatCount' className={styles.inputCustom} />
						<p>раз</p>
					</FlexRow>
				</FlexRow>
				<ControlledCheckbox
					name='rejectEmail'
					className={styles.checkBox}
					type={'checkbox'}
					label='Отсечка повторной регистрации по e-mail'
					$margin='0 0 10px 0'
				/>
				<ControlledCheckbox
					name='rejectPhone'
					className={styles.checkBox}
					type={'checkbox'}
					label='Отсечка повторной регистрации по номеру телефона'
				/>
			</FlexRow>
			<FlexRow className={styles.settingElem}>
				<CustomText $margin='0 0 12px 0' $fontWeight='600' $fontSize={'16px'}>
					Групповой билет
				</CustomText>
				<ControlledCheckbox
					className={styles.checkBox}
					name='use_group_ticket'
					type={'checkbox'}
					label='Подключить регистрацию группы. Участники группы проходят по одному билету (QR-коду) по очереди, количество проходов = количеству гостей в группе.'
				/>
			</FlexRow>
			<FlexRow className={styles.settingElem}>
				<CustomText $margin='0 0 12px 0' $fontWeight='600' $fontSize={'16px'}>
					Подписка на рассылку
				</CustomText>
				<ControlledCheckbox
					className={styles.checkBox}
					name='use_follow'
					type={'checkbox'}
					label='Отдельно предлагать гостям подписаться на рассылку при регистрации'
				/>
			</FlexRow>
		</AdminSection>
	)
}
