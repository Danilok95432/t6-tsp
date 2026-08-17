import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneCategoryInputs = {
	title: string
	use_main?: boolean
	main_button?: string
	short?: string
	full?: string
	img?: ImageItemWithText[]
	img_inside?: ImageItemWithText[]
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	url?: string
	hidden?: boolean
	parent?: SelOption[] | string
}

export const oneCategorySchema = yup.object().shape({
	title: yup
		.string()
		.required('Наименование обязательно')
		.max(200, 'Наименование не может превышать 200 символов'),
})
