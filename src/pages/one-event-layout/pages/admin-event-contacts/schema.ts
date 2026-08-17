import { type pathwaysEvent } from 'src/types/events'
import * as yup from 'yup'

export type EventContactsInputs = {
	website: string
	contact_telphone: string
	contact_tg: string
	contact_email: string
	hide_telphone?: boolean
	hide_tg?: boolean
	hide_email?: boolean
	pathways?: pathwaysEvent[]
	hide_pathways?: boolean
}

export const eventContactsSchema = yup.object().shape({
	website: yup.string().url('Неверный формат сайта').required('Введите ссылку на сайт'),
	contact_email: yup.string().email('Неверный формат e-mail').required('Введите почту'),
	contact_tg: yup.string().required('Введите имя пользователя или тег группы'),
	contact_telphone: yup.string().required('Неверный формат телефона'),
})
