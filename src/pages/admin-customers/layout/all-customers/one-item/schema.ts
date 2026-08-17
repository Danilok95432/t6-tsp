import { type UserCartOrders } from 'src/types/customers'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneCustomerInputs = {
	// citys?: SelOption[] | string
	// citys_id?: string
	// dom?: string
	email?: string
	fathname: string
	firstname: string
	hidden?: boolean
	vip?: boolean
	id?: string
	orders?: UserCartOrders[]
	review_on_main?: boolean
	review_text?: string
	// room?: string
	// street?: string
	surname: string
	telphone?: string
	user_comment?: string
	user_title?: string
	user_types: SelOption[] | string
	user_types_id?: string
	user_name?: string
	user_pass?: string
	user_pass2?: string
	use_spam?: boolean
}

export const oneCustomerSchema = yup.object().shape({
	firstname: yup
		.string()
		.required('Имя обязательно')
		.max(200, 'Имя не может превышать 200 символов'),
	surname: yup
		.string()
		.required('Фамилия обязательна')
		.max(200, 'Фамилия не может превышать 200 символов'),
	fathname: yup
		.string()
		.required('Отчество обязательно')
		.max(200, 'Отчество не может превышать 200 символов'),
	user_types: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите тип', (value) => {
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
		.required('Выберите тип'),
	user_pass2: yup.string().oneOf([yup.ref('user_pass')], 'Пароли не совпадают'),
})
