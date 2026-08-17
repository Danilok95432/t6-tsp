import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

type MainSectionProps = {
	deliverOption?: SelOption[]
	statusOption?: SelOption[]
	sdekOption?: SelOption[]
	cityOption?: SelOption[]
	usersOption?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({
	deliverOption,
	statusOption,
	sdekOption,
	cityOption,
	usersOption,
}) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<ControlledSelect
				name='order_delivery'
				label='Получение заказа'
				selectOptions={deliverOption ?? [{ label: 'Доставка до двери', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='sdek_point'
				label='Пункт выдачи СДЭК'
				selectOptions={sdekOption ?? [{ label: 'Пункт доставки СДЭК не выбран', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='order_status'
				label='Статус заказа'
				selectOptions={statusOption ?? [{ label: 'Ожидание', value: '0' }]}
				margin='0 0 20px 0'
				className={styles.select}
			/>
			<ControlledSelect
				name='siteusers'
				label='Выбор пользователя'
				selectOptions={usersOption ?? [{ label: 'Выберите пользователя', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput name='order_firstname' label='Имя' margin='0 0 20px 0' />
			<ControlledInput name='order_surname' label='Фамилия' margin='0 0 20px 0' />
			<ControlledInput name='order_secondname' label='Отчество' margin='0 0 20px 0' />
			<ControlledInput
				name='order_user_title'
				label='Наименование покупателя'
				margin='0 0 20px 0'
			/>
			<ControlledInput name='order_email' label='Email' margin='0 0 20px 0' />
			<ControlledInput name='order_telphone' label='Телефон' margin='0 0 20px 0' isPhone />
			<ControlledSelect
				name='citys'
				label='Город'
				selectOptions={cityOption ?? [{ label: 'Выберите город', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput name='order_street' label='Улица' margin='0 0 20px 0' />
			<ControlledInput name='order_dom' label='Дом' margin='0 0 20px 0' />
			<ControlledInput name='order_house' label='Квартира' margin='0 0 20px 0' />
			<ControlledInput
				name='order_address'
				label='Точный адрес доставки (если выбран вариант «До двери»'
				margin='0 0 20px 0'
				isTextarea
				height='54px'
			/>
			<ControlledInput name='delivery_time' label='Время доставки' margin='0 0 20px 0' />
			{/* <ControlledDateInput
				className={classNames(adminStyles.adminDateTimeInput, adminStyles.adminDateTimeInputFull)}
				label='Дата и время заказа'
				name='order_date'
				placeholder='гггг-мм-дд чч:мм'
				showTimeSelect
				dateFormat='yyyy-MM-dd HH:mm'
				timeFormat='HH:mm'
			/> */}
			<ControlledInput name='order_date' label='Дата и время заказа' margin='0 0 20px 0' />
			<ControlledInput
				name='price_items'
				label='Стоимость товаров'
				margin='0 0 20px 0'
				isLogin
				stelsDisabled
			/>
			<ControlledInput name='price_delivery' label='Стоимость доставки' margin='0 0 20px 0' />
			<ControlledInput
				name='price_total'
				label='Общая стоимость'
				margin='0 0 20px 0'
				isLogin
				stelsDisabled
			/>
		</AdminSection>
	)
}
