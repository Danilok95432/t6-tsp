import * as yup from 'yup'

export type regField = {
	active?: boolean
	req?: boolean
}

export type regPhoneField = {
	active?: boolean
	req?: boolean
	use_sms?: boolean
}

export type regEmailField = {
	active?: boolean
	req?: boolean
	use_email?: boolean
}

export type RegistrationSettingsInputs = {
	use_reg?: boolean
	startDate: string
	startTime: Date
	endDate: string
	endTime: Date
	regFields: {
		surname: regField
		name: regField
		patronymic: regField
		birthday: regField
		region: regField
		phone: regPhoneField
		email: regEmailField
	}
	guestsLimit?: string
	use_repeat_reg?: boolean
	repeatCount?: string
	rejectEmail?: boolean
	rejectPhone?: boolean
	use_group_ticket?: boolean
	use_follow?: boolean
}

export const registrationSettingsSchema = yup.object().shape({
	startDate: yup.string().required('Введите дату'),
	startTime: yup.date().required('Введите время'),
	endDate: yup.string().required('Введите дату'),
	endTime: yup.date().required('Введите время'),
})
