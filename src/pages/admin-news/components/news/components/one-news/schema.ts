import { type ImageItemWithText } from 'src/types/photos'
import { type MultiSelOption, type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type NewsPhoto = {
	id: string
	thumbnail: string
	original: string
	title: string
}

export type OneNewsInputs = {
	title: string
	itemdate: string
	news_gallerys?: SelOption[]
	events?: string | SelOption[]
	vidslist?: string | MultiSelOption[]
	relatedNews?: string
	id_gallery?: string
	short: string
	full: string
	photo?: ImageItemWithText[]
	description?: string
	keywords?: string[]
	main?: boolean
	hidden?: boolean
}

export const oneNewsSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заголовок обязателен')
		.max(200, 'Заголовок не может превышать 200 символов'),
	itemdate: yup.string().required('Введите дату'),
	short: yup.string().required('Введите короткое описание'),
	full: yup.string().required('Введите текст новости'),
	/*
	events: yup
		.mixed<string | SelOption[]>()
		.test('is-event-selected', 'Выберите хотя бы одно событие', (value) => {
			if (typeof value === 'string') {
				return true
			} else if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]
				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Объект не выбран'
				) {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		})
		.required('Выберите хотя бы одно событие'),
	chainedObjects: yup
		.mixed<string | SelOption[]>()
		.test('is-object-selected', 'Выберите хотя бы один объект', (value) => {
			if (typeof value === 'string') {
				return true
			} else if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]
				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Объект не выбран'
				) {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		})
		.required('Выберите хотя бы один объект'),
		*/
})
