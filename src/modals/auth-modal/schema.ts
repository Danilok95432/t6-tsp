import * as yup from 'yup'

export type AuthInputs = {
	user_name: string
	password: string
}

export const authSchema = yup.object().shape({
	user_name: yup.string().required('Введите логин'),
	password: yup.string().required('Введите пароль'),
	// verificationCode: yup.string().required('Введите проверочный код'),
})
