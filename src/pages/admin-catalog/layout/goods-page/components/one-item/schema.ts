import { type FileItem } from 'src/types/files'
import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption, type MultiSelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneGoodsInputs = {
	title: string
	artikul: string
	catalogs: SelOption[] | string
	brands: SelOption[] | string
	types?: MultiSelOption[] | string
	use_weight: boolean
	weight_one: string
	weight_price_kg: string
	weight_default: string
	item_weight: string
	item_width: string
	item_length: string
	item_height: string
	item_desc?: string
	package?: string
	nal?: string
	item_price?: string
	item_price_discount?: string
	short?: string
	full?: string
	hidden?: boolean
	use_mainslider?: boolean
	use_best?: boolean
	use_old?: boolean
	use_new?: boolean
	use_theme?: boolean
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	img?: ImageItemWithText[]
	images?: ImageItemWithText[]
	documents?: FileItem[]
}

const weightString = yup
	.string()
	.defined()
	.default('')
	.max(200, 'Значение не может превышать 200 символов')

export const oneGoodsSchema = yup.object({
	title: yup
		.string()
		.required('Обязательный параметр')
		.max(200, 'Наименование не может превышать 200 символов'),

	artikul: yup
		.string()
		.required('Обязательный параметр')
		.max(200, 'Артикул не может превышать 200 символов'),

	use_weight: yup.boolean().defined().default(false),

	weight_one: weightString.when('use_weight', {
		is: true,
		then: (schema) => schema.required('Обязательный параметр'),
		otherwise: (schema) => schema,
	}),

	weight_price_kg: weightString.when('use_weight', {
		is: true,
		then: (schema) => schema.required('Обязательный параметр'),
		otherwise: (schema) => schema,
	}),

	weight_default: weightString.when('use_weight', {
		is: true,
		then: (schema) => schema.required('Обязательный параметр'),
		otherwise: (schema) => schema,
	}),

	item_weight: weightString.when('use_weight', {
		is: false,
		then: (schema) => schema.required('Обязательный параметр'),
		otherwise: (schema) => schema,
	}),

	item_height: yup
		.string()
		.required('Обязательный параметр')
		.max(200, 'Значение не может превышать 200 символов'),

	item_width: yup
		.string()
		.required('Обязательный параметр')
		.max(200, 'Значение не может превышать 200 символов'),

	item_length: yup
		.string()
		.required('Обязательный параметр')
		.max(200, 'Значение не может превышать 200 символов'),

	catalogs: yup
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

	brands: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите производителя', (value) => {
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
					firstElement.label === 'Производитель не выбран'
				) {
					return false
				}

				return true
			}

			return false
		})
		.required('Выберите производителя'),
})
