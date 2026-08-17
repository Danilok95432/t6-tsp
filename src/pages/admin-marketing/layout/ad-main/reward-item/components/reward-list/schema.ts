import { type AwardItem } from 'src/types/marketing'
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type RewardItemInputs = {
	block_name: string
	colors_list?: SelOption[]
	awards?: AwardItem[]
}

export const rewardItemsSchema = yup.object().shape({
	block_name: yup
		.string()
		.required('Название обязательно')
		.max(200, 'Название не может превышать 200 символов'),
})
