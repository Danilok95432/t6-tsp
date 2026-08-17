import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type funInfoInputs = {
	hidden?: boolean
	title: string
	desc: string
	createdate?: Date
	logo?: ImageItemWithText[]
	mainphoto?: ImageItemWithText[]
	bottomDesc?: string
}

export const funInfoSchema = yup.object().shape({
	title: yup.string().required('Введите наименование'),
	desc: yup.string().required('Введите описание игры'),
})
