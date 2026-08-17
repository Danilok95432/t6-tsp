import { CustomText } from 'src/components/custom-text/custom-text'

import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

export const FieldsSection = () => {
	return (
		<div className={styles.fields}>
			<h3>Поля формы регистрации</h3>
			<FlexRow className={styles.fieldsSection}>
				<FlexRow className={styles.leftSideRow}>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Фамилия»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.surname.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.surname.req'
								label='Обязательное поле'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Имя»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.name.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.name.req'
								label='Обязательное поле'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Отчество»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.patronymic.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.patronymic.req'
								label='Обязательное поле'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Дата рождения»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.birthday.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.birthday.req'
								label='Обязательное поле'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
				</FlexRow>
				<FlexRow className={styles.rightSideRow}>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Город или регион»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.region.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.region.req'
								label='Обязательное поле'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «Номер телефона»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.phone.active'
								label='Активное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.phone.req'
								label='Обязательное поле'
								type='checkbox'
							/>
							<ControlledCheckbox
								name='regFields.phone.use_sms'
								label='Использовать SMS для подтверждения регистрации (требует подключения тарифной опции и имени отправителя). Плату за отправку SMS взимает оператор сотовой связи.'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.fieldElem}>
						<CustomText $margin='0 0 5px 0' $fontWeight='600'>
							Поле «E-mail»
						</CustomText>

						<FlexRow className={styles.checkRow}>
							<ControlledCheckbox
								name='regFields.email.active'
								label='Активное поле'
								type='checkbox'
								disabled
								autoActive
								value
							/>
							<ControlledCheckbox
								name='regFields.email.req'
								label='Обязательное поле'
								type='checkbox'
								disabled
								autoActive
								value
							/>
							<ControlledCheckbox
								name='regFields.email.use_email'
								label='Использовать e-mail для подтверждения регистрации'
								type='checkbox'
							/>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</FlexRow>
		</div>
	)
}
