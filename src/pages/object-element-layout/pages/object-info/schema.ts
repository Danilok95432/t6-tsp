import * as yup from 'yup'
import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption } from 'src/types/select'

export type ObjectInfoInputs = {
	title: string
	object_types?: SelOption[]
	object_apply?: SelOption[]
	photo?: ImageItemWithText[]
	icon?: ImageItemWithText[]
	mainDesc: string
	descList: string
	phone?: string
	email: string
	address?: string
	tgName?: string
	tgSoc?: string
	vkName?: string
	vkSoc?: string
	coords: string
	org_name?: string
	org_ogrn?: string
	org_inn?: string
	org_address?: string
	org_phone?: string
}

export const objectInfoSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
	mainDesc: yup.string().required('Введите краткое описание'),
	descList: yup.string().required('Введите полное описание'),
	email: yup.string().required('Введите полный почтовый адрес'),
	coords: yup.string().required('Введите координаты через запятую'),
})
