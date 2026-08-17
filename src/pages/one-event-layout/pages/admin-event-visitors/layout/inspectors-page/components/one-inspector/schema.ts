import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OneInspectorInputs = {
	fio: string
	telphone: string
	description?: string
	user_name?: string
	user_pass?: string
	inspector_types_list?: string | SelOption[]
	inspector_pitanie_place?: string | SelOption[]
	inspector_enter_zones?: string | SelOption[]
}

export const oneInspectorSchema = yup.object().shape({
	fio: yup.string().required('ФИО обязательно для ввода'),
	telphone: yup.string().required('Введите телефон'),
})
