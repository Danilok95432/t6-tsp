import { type FileItem } from 'src/types/files'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneSolProjectInputs = {
	title: string
	part: SelOption[] | string
	category: SelOption[] | string
	level: SelOption[] | string
	solution: SelOption[] | string
	short?: string
	full?: string
	hidden?: boolean
	customer: string
	finalPrice: string
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	documents?: FileItem[]
}

export const oneSolProjectSchema = yup.object().shape({
	title: yup.string().required('Наименование обязательно'),
	customer: yup.string().required('Заказчик обязателен'),
	finalPrice: yup.string().required('Стоимость обязательна'),
	part: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите раздел', (value) => {
			if (typeof value === 'string') {
				return true
			}

			if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]

				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Раздел не выбран'
				) {
					return false
				}

				return true
			}

			return false
		})
		.required('Выберите раздел'),
	category: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите категорию', (value) => {
			if (typeof value === 'string') {
				return true
			}

			if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]

				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Категория не выбрана'
				) {
					return false
				}

				return true
			}

			return false
		})
		.required('Выберите категорию'),
	level: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите уровень', (value) => {
			if (typeof value === 'string') {
				return true
			}

			if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]

				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Уровень не выбран'
				) {
					return false
				}

				return true
			}

			return false
		})
		.required('Выберите уровень'),
	solution: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите решение', (value) => {
			if (typeof value === 'string') {
				return true
			}

			if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]

				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Решение не выбрано'
				) {
					return false
				}

				return true
			}

			return false
		})
		.required('Выберите решение'),
})
