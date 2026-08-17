import * as yup from 'yup'

export type FunRulesInputs = {
	title?: string
	desc?: string
	rules: string
}

export const funRulesSchema = yup.object().shape({
	rules: yup.string().required('Введите правила'),
})
