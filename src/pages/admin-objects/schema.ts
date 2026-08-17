import * as yup from 'yup'

export type ObjectInputs = {
	description: string
}

export const objectSchema = yup.object().shape({
	description: yup.string().required('Введите текст'),
})
