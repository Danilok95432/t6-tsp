import * as yup from 'yup'

export type QuestionInputs = {
	title: string
	content: string
	hidden?: boolean
}

export const QuestionSchema = yup.object().shape({
	title: yup.string().required('Введите вопрос'),
	content: yup.string().required('Введите ответ'),
})
