import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type MainInfoInputs = {
	title: string
	shortDesc: string
	region: string
	date_from: string
	time_from: Date
	date_to: string
	time_to: Date
	age_list?: string | SelOption[]
	publicity_list?: string | SelOption[]
}

export const mainInfoSchema = yup.object().shape({
	title: yup.string().required('Введите название события'),
	date_from: yup.string().required('Введите дату'),
	time_from: yup.date().required('Введите время'),
	date_to: yup.string().required('Введите дату'),
	time_to: yup.date().required('Введите время'),
	shortDesc: yup.string().required('Введите краткое описание'),
	region: yup.string().required('Введите регион'),
})
