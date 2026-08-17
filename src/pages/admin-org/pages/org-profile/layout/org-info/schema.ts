import * as yup from 'yup'

export type OrgProfileInputs = {
	shortTitle: string
	title: string
	marka: string
	region: string
	urAdrees: string
	factAdress: string
	mailAdress: string
}

export const orgProfileSchema = yup.object().shape({
	shortTitle: yup.string().required('Введите название'),
	title: yup.string().required('Введите название'),
	marka: yup.string().required('Введите название'),
	region: yup.string().required('Введите название'),
	urAdrees: yup.string().required('Введите название'),
	factAdress: yup.string().required('Введите название'),
	mailAdress: yup.string().required('Введите название'),
})
