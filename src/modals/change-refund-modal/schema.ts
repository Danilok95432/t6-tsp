import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type RefundInputs = {
	refund?: SelOption | string
	use_auto_refund?: boolean
	kom?: SelOption | string
	procent?: SelOption | string
	use_reject?: boolean
	use_rej_message?: boolean
	use_refund_free?: boolean
	day_count?: SelOption | string
	use_refund_after?: boolean
}
export const refundModalSchema = yup.object().shape({})
