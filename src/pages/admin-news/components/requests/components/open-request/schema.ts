import * as yup from 'yup'

export type OpenRequestInputs = {
	publicdate: string
	short?: string
	title: string
	hidden?: boolean
	original_date?: boolean
	id_request_type?: string
	request_type_name?: string
	source?: string
	request_type?: string
	item_id?: string
}

export const openRequestSchema = yup.object().shape({
	title: yup.string().required('Введите название'),
	publicdate: yup.string().required('Введите дату'),
})
