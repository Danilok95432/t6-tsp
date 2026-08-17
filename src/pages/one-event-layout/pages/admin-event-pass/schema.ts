import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type EventPassInputs = {
	control_list: SelOption[] | string
	auto_list: SelOption[] | string
	turniketsCount?: string
	manual_list: SelOption[] | string
	inspectorsCount?: string
	use_tech_conditions?: boolean
	use_com_conditions?: boolean
	use_paid?: boolean
	paidCount?: string
	use_docs?: boolean
	signed?: string
	ready?: string
	inWork?: string
}

export const eventPassSchema = yup.object().shape({})
