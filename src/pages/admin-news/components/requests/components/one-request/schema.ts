import * as yup from 'yup'

export type OneRequestInputs = {
	publicdate: string
	short?: string
	title: string
	hidden?: boolean
	original_date?: boolean
	id_request_type?: string
	item_id?: string
}

export const oneRequestSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
	publicdate: yup.string().required('Введите дату'),
})
