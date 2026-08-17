import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

type MainSectionProps = {
	customerOption?: SelOption[]
	cityOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ customerOption, cityOption }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledSelect
				name='user_types'
				label='Тип покупателя'
				selectOptions={customerOption ?? [{ label: 'Выберите тип', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput name='surname' label='Фамилия' margin='0 0 20px 0' />
			<ControlledInput name='firstname' label='Имя' margin='0 0 20px 0' />
			<ControlledInput name='fathname' label='Отчество' margin='0 0 20px 0' />
			<ControlledInput name='user_title' label='Наименование пользователя' margin='0 0 20px 0' />
			<ControlledInput name='telphone' label='Телефон' margin='0 0 20px 0' isPhone />
			<ControlledInput name='email' label='E-mail' margin='0 0 20px 0' />
			<ControlledCheckbox
				type='checkbox'
				label='Пользователь хочет получать новости на почту'
				name='use_spam'
				$margin='0 0 20px 0'
			/>
			<ControlledInput name='user_name' label='Логин' margin='0 0 20px 0' />
			<ControlledInput name='user_pass' label='Пароль' margin='0 0 20px 0' type='password' />
			<ControlledInput
				name='user_pass2'
				label='Подтверждение пароля'
				margin='0 0 20px 0'
				type='password'
			/>
			{/* <ControlledSelect
				name='citys'
				label='Город'
				selectOptions={cityOption ?? [{ label: 'Выберите город', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput name='street' label='Улица' margin='0 0 20px 0' />
			<ControlledInput name='dom' label='Дом' margin='0 0 20px 0' />
			<ControlledInput name='room' label='Квартира' margin='0 0 20px 0' /> */}
			<ControlledInput
				name='user_comment'
				label='Примечание «О покупателе»'
				margin='0 0 20px 0'
				isTextarea
				height='54px'
			/>
			{/* <ControlledInput
				name='review_text'
				label='Отзыв покупателя'
				margin='0 0 20px 0'
				isTextarea
				height='54px'
			/> */}
		</AdminSection>
	)
}
