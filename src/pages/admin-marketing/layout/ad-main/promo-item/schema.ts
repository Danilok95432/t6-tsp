import { type ImageItemWithText } from 'src/types/photos'
import * as yup from 'yup'

export type PromoItemInputs = {
	block_name: string
	block_desc: string
	block_link?: string
	img?: ImageItemWithText[]
}

export const promoItemsSchema = yup.object().shape({
	block_desc: yup
		.string()
		.required('Надпись обязательна')
		.max(200, 'Надпись не может превышать 200 символов'),
	block_name: yup
		.string()
		.required('Надпись обязательна')
		.max(200, 'Надпись не может превышать 200 символов'),
})
