import { type ImageItemWithText } from 'src/types/photos'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type RewardItemInputs = {
	title: string
	itemname?: string
	itemdesc?: string
	colors_list?: SelOption[]
	colors_list_id?: string
	hidden?: boolean
	img?: ImageItemWithText[]
}

export const rewardItemsSchema = yup.object().shape({
	title: yup
		.string()
		.required('Название обязательно')
		.max(200, 'Название не может превышать 200 символов'),
})
