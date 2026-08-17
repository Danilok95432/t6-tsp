import * as yup from 'yup'

export type EtnoRulesInputs = {
	title?: string
	desc?: string
	rules: string
}

export const etnoRulesSchema = yup.object().shape({
	rules: yup.string().required('Введите правила'),
})
