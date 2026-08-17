import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type EtnoInputs = {
	anonstext: string
	photos?: ImageItemWithText[]
}

export const etnoSchema = yup.object().shape({
	anonstext: yup
		.string()
		.required('Это поле обязательно')
		.test('is-empty', 'Введите текст', (value) => {
			const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
			return !!cleanValue && cleanValue !== ''
		}),
})
