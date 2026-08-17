import { type ImageItemWithText } from 'src/types/photos'
import { type MultiSelOption, type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneVideoInputs = {
	title: string
	itemdate: string
	short: string
	vkvideo: string
	vkexport: string
	photo?: ImageItemWithText[]
	events?: string | SelOption[]
	vidslist?: string | MultiSelOption[]
	hidden?: boolean
	key?: boolean
}

export const oneVideoSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заголовок обязателен')
		.max(200, 'Заголовок не может превышать 200 символов'),
	itemdate: yup.string().required('Введите дату'),
	short: yup.string().required('Введите короткое описание'),
	vkvideo: yup.string().url('Неверный формат ссылки').required('Введите ссылку на видео'),
	vkexport: yup.string().required('Введите текст кода'),
})
