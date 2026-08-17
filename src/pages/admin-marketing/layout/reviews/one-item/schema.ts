import * as yup from 'yup'

export type OneReviewInputs = {
	fio: string
	comment?: string
	rating: string
	review_date?: string
	role?: string
	hidden?: boolean
}

export const oneReviewSchema = yup.object().shape({
	fio: yup.string().required('ФИО обязательно').max(200, 'ФИО не может превышать 200 символов'),
	rating: yup.string().required('Введите рейтинг'),
})
