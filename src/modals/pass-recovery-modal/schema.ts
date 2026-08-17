import * as yup from 'yup'

export type PassRecoveryInputs = {
	login: string
	verificationCode: string
}

export const passRecoverySchema = yup.object().shape({
	login: yup.string().required('Введите логин'),
	verificationCode: yup.string().required('Введите проверочный код'),
})
