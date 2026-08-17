import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type SupportRequestInputs = {
	topic?: SelOption | string
	urgency?: SelOption | string
	files?: File[]
	text: string
}
export const supportRequestModalSchema = yup.object().shape({
	text: yup.string().required('Введите текст обращения'),
})
