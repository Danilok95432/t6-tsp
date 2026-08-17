import * as yup from 'yup'

export type OrgDetailsInputs = {
	title: string
	inn: string
	kpp: string
	ogrn: string
	phone: string
	bank: string
	bik: string
	rachet: string
	korchet: string
	boss: string
	fio: string
}

export const orgDetailsSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
	inn: yup.string().required('Введите название'),
	kpp: yup.string().required('Введите название'),
	ogrn: yup.string().required('Введите название'),
	phone: yup.string().required('Введите название'),
	bank: yup.string().required('Введите название'),
	bik: yup.string().required('Введите название'),
	rachet: yup.string().required('Введите название'),
	korchet: yup.string().required('Введите название'),
	boss: yup.string().required('Введите название'),
	fio: yup.string().required('Введите название'),
})
