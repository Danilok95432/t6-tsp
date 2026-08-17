import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneDocumentInputs = {
	type_list: SelOption[] | string
	date: string
	number: string
	title: string
	sum?: string
	comment: string
	scans?: File[]
}

export const oneDocumentSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
	number: yup.string().required('Введите номер'),
	date: yup.string().required('Введите дату'),
	comment: yup.string().required('Укажите комментарий'),
	type_list: yup
		.mixed<string | SelOption[]>()
		.test('is-object-selected', 'Выберите хотя бы один тип', (value) => {
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
