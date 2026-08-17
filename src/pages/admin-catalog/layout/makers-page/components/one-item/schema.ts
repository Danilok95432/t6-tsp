import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type OneMakerInputs = {
	title: string
	country: string
	brand_link?: string
	brand_text?: string
	mainphoto?: ImageItemWithText[]
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	url?: string
	hidden?: boolean
}

export const oneMakerSchema = yup.object().shape({
	title: yup
		.string()
		.required('Наименование обязательно')
		.max(200, 'Наименование не может превышать 200 символов'),
	country: yup
		.string()
		.required('Страна обязательно')
		.max(200, 'Название страны не может превышать 200 символов'),
})
