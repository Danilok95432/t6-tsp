import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type TraditionInfoInputs = {
	hidden?: boolean
	website: string
	title: string
	desc: string
	createdate?: Date
	logo?: ImageItemWithText[]
	photos?: ImageItemWithText[]
	bottomDesc?: string
}

export const traditionInfoSchema = yup.object().shape({
	title: yup.string().required('Введите наименование'),
	website: yup.string().required('Введите адрес сайта'),
	desc: yup.string().required('Введите описание культуры'),
})
