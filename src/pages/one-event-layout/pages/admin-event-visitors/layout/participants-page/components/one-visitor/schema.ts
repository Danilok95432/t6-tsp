import { type SubEventOptions } from 'src/types/select'
import * as yup from 'yup'

export type GuestCarsList = {
	car_type: string
	car_number: string
}

export type OneVisitorInputs = {
	surname: string
	firstname: string
	fathname?: string
	age?: string
	birthdate?: string
	id_region: string
	id_city: string
	city_name?: string
	phone: string
	code: string
	id_reg_type?: string
	id_event?: string
	use_group?: boolean
	group_name?: string
	id_group_type?: string
	id_event_role?: string
	group_count?: string
	sub_events_group?: SubEventOptions[] | string
	sub_events_etno?: SubEventOptions[] | string
	sub_events_fun?: SubEventOptions[] | string
	use_org?: boolean
	use_volunteer?: boolean
	trader_name?: string
	use_lager?: boolean
	id_lager_type?: string
	lager_count?: string
	data_zaezd?: string
	data_viezd?: string
	use_sportsmen?: boolean
	use_folk?: boolean
	use_trader?: boolean
	use_master?: boolean
	master_name?: string
	id_car_type?: string
	car_number?: string
	use_journalist?: boolean
	journal_name?: string
	use_car?: boolean
	cars_count?: string
	cars_list?: GuestCarsList[]
	trader_name_group?: string
	master_name_group?: string
	journal_name_group?: string
}

export const oneVisitorSchema = yup.object().shape({
	surname: yup.string().required('Введите фамилию'),
	firstname: yup.string().required('Введите имя'),
	code: yup.string().required('Введите верный код'),
	id_region: yup
		.string()
		.required('Введите регион')
		.test('contains-comma', 'Выберите регион из списка', (value) => {
			return value === 'Иностранец' || value.includes(',')
		}),
	id_city: yup.string().required('Введите название населенного пункта'),
	phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
})
