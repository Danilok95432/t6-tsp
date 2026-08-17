import * as yup from 'yup'

export type ResponseInputs = {
	text: string
}
export const responseModalSchema = yup.object().shape({
	text: yup.string().required('Введите текст ответа'),
})
