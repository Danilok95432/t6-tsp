import * as yup from 'yup'

export type RejectRefundInputs = {
	comment?: string
}
export const rejectRefundModalSchema = yup.object().shape({})
