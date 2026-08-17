import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneVisitorInputs = {
	number: string
	itemdate: string
	time?: Date
	type: string | SelOption[]
	price?: string
	use_price?: boolean
	customer: string
	phone: string
	email: string
	use_group_ticket?: boolean
	visitors: string
	comment?: string
}

export const oneVisitorSchema = yup.object().shape({
	number: yup
		.string()
		.required('Заголовок обязателен')
		.max(200, 'Заголовок не может превышать 200 символов'),
	itemdate: yup.string().required('Введите дату'),
	customer: yup.string().required('Введите ФИО покупателя'),
	phone: yup.string().required('Введите номер телефона покупателя'),
	email: yup.string().required('Введите почту покупателя'),
	visitors: yup.string().required('Введите количество посетителей'),
	type: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите хотя бы один тип', (value) => {
			if (typeof value === 'string') {
				return true
			} else if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]
				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Тип не выбран'
				) {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		})
		.required('Выберите хотя бы один тип'),
})
