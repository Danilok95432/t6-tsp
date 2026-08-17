import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type CommunityInputs = {
	logo?: ImageItemWithText[]
	mainDescs: string
	caption?: string
	caption_show?: boolean
	gallerySection?: boolean
	photoGallery?: ImageItemWithText[]
	articleSection?: boolean
	descs?: string
}

export const communitySchema = yup.object().shape({
	mainDescs: yup.string().required('Введите текст'),
	caption: yup.string(),
	gallerySection: yup.boolean(),
	articleSection: yup.boolean(),
	descs: yup.string().when('articleSection', ([articleSection]) => {
		return articleSection
			? yup
					.string()
					.required('Это поле обязательно')
					.test('is-empty', 'Введите текст', (value) => {
						const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
						return !!cleanValue && cleanValue !== ''
					})
			: yup.string().notRequired()
	}),
})
