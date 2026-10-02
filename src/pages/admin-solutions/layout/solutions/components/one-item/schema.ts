import { type FileItem } from 'src/types/files'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type EquipmentItem = {
	name: string
	quantity: number
}

type EquipItem = {
	name: string
	quantity: number
}

export type OneSolutionInputs = {
	title: string
	code: string
	tools?: SelOption[] | string
	count?: string
	equipmentList?: EquipItem[]
	part: SelOption[] | string
	category: SelOption[] | string
	level: SelOption[] | string
	price1?: string
	price2?: string
	price3?: string
	short?: string
	full?: string
	hidden?: boolean
	use_best?: boolean
	use_rec?: boolean
	use_stop?: boolean
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	documents?: FileItem[]
}

export const oneSolutionSchema = yup.object().shape({
	title: yup
		.string()
		.required('Наименование обязательно')
		.max(200, 'Наименование не может превышать 200 символов'),
	code: yup.string().required('Код обязателен').max(200, 'Код не может превышать 200 символов'),
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
})
