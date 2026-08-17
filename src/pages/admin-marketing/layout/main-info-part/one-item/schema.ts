import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneInfoItemInputs = {
	id?: string
	page_name: string
	page_text?: string
	parents?: SelOption[] | string
	parents_id?: string
	hidden?: boolean
}

export const oneInfoItemSchema = yup.object().shape({
	page_name: yup
		.string()
		.required('Наименование обязательно')
		.max(200, 'Наименование не может превышать 200 символов'),
})
