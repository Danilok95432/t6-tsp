import * as yup from 'yup'

export type OneTypeInputs = {
	title: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	url?: string
	seo_title?: string
	hidden?: boolean
}

export const oneTypeSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заголовок обязателен')
		.max(200, 'Заголовок не может превышать 200 символов'),
})
