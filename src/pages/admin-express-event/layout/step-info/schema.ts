import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type InfoInputs = {
	adress: string
	title?: string
	website?: string
	contact_telphone?: string
	contact_tg?: string
	contact_email?: string
	hide_website?: boolean
	hide_telphone?: boolean
	hide_tg?: boolean
	hide_email?: boolean
	photo?: ImageItemWithText[]
}

export const infoSchema = yup.object().shape({
	adress: yup.string().required('Введите точный адрес'),
})
