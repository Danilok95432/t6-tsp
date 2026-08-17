import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type NatureInputs = {
	articleName: string
	topDescs: string
	gallerySection?: boolean
	photos?: ImageItemWithText[]
	bottomDescsSection?: boolean
	bottomDescs?: string
}

export const natureSchema = yup.object().shape({
	articleName: yup.string().required('Введите название статьи'),
	topDescs: yup.string().required('Введите текст статьи'),
	gallerySection: yup.boolean(),
	bottomDescsSection: yup.boolean(),
	bottomDescs: yup.string().when('bottomDescsSection', ([bottomDescsSection]) => {
		return bottomDescsSection
			? yup
					.string()
					.required('Это поле обязательно')
					.test('is-empty', 'Введите текст статьи', (value) => {
						const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
						return !!cleanValue && cleanValue !== ''
					})
			: yup.string().notRequired()
	}),
})
