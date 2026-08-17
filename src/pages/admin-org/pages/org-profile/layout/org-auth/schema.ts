import * as yup from 'yup'

export type OrgAuthInputs = {
	login: string
	password: string
	repeatPassword: string
	publicPhone?: string
	website?: string
	email?: string
	tg?: string
	vk?: string
}

export const orgAuthSchema = yup.object().shape({
	login: yup.string().required('Введите название'),
	password: yup.string().required('Введите название'),
	repeatPassword: yup.string().required('Введите название'),
})
