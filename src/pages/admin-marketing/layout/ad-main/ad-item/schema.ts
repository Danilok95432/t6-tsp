import { type AdItem } from 'src/types/marketing'
import * as yup from 'yup'

export type AdItemInputs = {
	block_name: string
	advs?: AdItem[]
}

export const adItemsSchema = yup.object().shape({
	block_name: yup
		.string()
		.required('Название обязательно')
		.max(200, 'Название не может превышать 200 символов'),
})
