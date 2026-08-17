import * as yup from 'yup'

type GuestCarsList = {
	car_type: string
	car_number: string
}

export type OneVisitorInputs = {
	surname: string
	firstname: string
	fathname?: string | null
	age: string
	id_region: string
	id_city: string
	city_name?: string | null
	phone: string
	code: string
	use_group?: boolean
	group_name?: string
	id_group_type?: string
	group_count?: string
	use_car?: boolean
	cars_count?: string
	cars_list?: GuestCarsList[]
	use_lager?: boolean
	id_lager_type?: string
	lager_count?: string
	data_zaezd?: string
	data_viezd?: string
}

export const oneVisitorSchema = yup.object().shape({
	surname: yup.string().required('Введите фамилию'),
	firstname: yup.string().required('Введите имя'),
	fathname: yup.string().notRequired(),
	age: yup.string().required('Введите возраст'),
	id_region: yup
		.string()
		.required('Введите регион')
		.test('contains-comma', 'Выберите регион из списка', (value) => {
			return value === 'Иностранец' || (value?.includes(',') ?? false)
		}),
	id_city: yup.string().required('Введите название населенного пункта'),
	city_name: yup.string().notRequired(),
	phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
	code: yup.string().required('Введите верный код'),
})
