import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type FunInputs = {
	anonstext: string
	photos?: ImageItemWithText[]
}

export const funSchema = yup.object().shape({
	anonstext: yup
		.string()
		.required('Это поле обязательно')
		.test('is-empty', 'Введите текст', (value) => {
			const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
			return !!cleanValue && cleanValue !== ''
		}),
})
