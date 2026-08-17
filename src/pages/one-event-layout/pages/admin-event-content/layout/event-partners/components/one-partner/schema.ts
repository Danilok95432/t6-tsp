import { type PartnerCheckBoxesInfo } from 'src/types/partners'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type EventPartnerInputs = {
	partner_types?: PartnerCheckBoxesInfo[]
	partners_list: string | SelOption[]
}

export const eventPartnerSchema = yup.object().shape({
	partners_list: yup
		.mixed<string | SelOption[]>()
		.test('is-partner-selected', 'Укажите партнера', (value) => {
			if (typeof value === 'string') {
				return true
			} else if (Array.isArray(value) && value.length > 0) {
				const firstElement = value[0]
				if (
					typeof firstElement === 'object' &&
					firstElement !== null &&
					'label' in firstElement &&
					'value' in firstElement &&
					firstElement.label === 'Партнер не выбран'
				) {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		})
		.required('Укажите партнера'),
})
