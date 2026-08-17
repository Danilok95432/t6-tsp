import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type VidInfoInputs = {
	title: string
	desc: string
	mainphoto?: ImageItemWithText[]
	bottomDesc?: string
}

export const vidInfoSchema = yup.object().shape({
	title: yup.string().required('Введите наименование'),
	desc: yup.string().required('Введите описание традиции'),
})
