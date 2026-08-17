import * as yup from 'yup'

export type PaymentInputs = {
	use_card_pay?: boolean
	use_sbp?: boolean
	use_sber_pay?: boolean
}

export const paymentSchema = yup.object().shape({})
