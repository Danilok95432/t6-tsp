import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'

export type LocationInputs = {
	mapCoords: string
	topDescs: string
	mailSection?: boolean
	mailAddress?: string
	phoneSection?: boolean
	phoneOwner?: string
	phoneNumber?: string
	emailsSection?: boolean
	emailOwner?: string
	emailAddress?: string
	photos?: ImageItemWithText[]
}

export const locationSchema = yup.object().shape({
	mapCoords: yup.string().required('Введите координаты'),
	topDescs: yup.string().required('Введите текст анонса'),
	/*
	topDescs: yup.string().when('mapSection', ([mapSection]) => {
		return mapSection
			? yup
					.string()
					.required('Это поле обязательно')
					.test('is-empty', 'Введите текст', (value) => {
						const cleanValue = value?.replace(/<[^>]*>?/gm, '').trim()
						return !!cleanValue && cleanValue !== ''
					})
			: yup.string().notRequired()
	}),
	*/
	mailSection: yup.boolean(),
	phoneSection: yup.boolean(),
	emailsSection: yup.boolean(),
})
