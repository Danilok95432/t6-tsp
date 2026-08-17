import { type SelOption } from './select'

export type CustomerElement = {
	city_name: string
	email: string
	hidden: boolean
	id: string
	regdate: string
	summa_orders: string
	summa_return: string
	summa_sale: string
	telphone: string
	user_comment: string
	user_title: string
}

export type CustomerResponse = {
	siteusers: CustomerElement[]
	totalitems: string
}

export type CustomerNewIdResponse = {
	id: string
}

export type UserCartOrders = {
	id: string
	order_date: string
	order_status_name: string
	sostav: string
	count_items: string
	order_summ: string
}

export type CustomerInfoResponse = {
	citys: SelOption[]
	citys_id: string
	dom: string
	use_spam: boolean
	email: string
	fathname: string
	firstname: string
	hidden: boolean
	id: string
	orders: UserCartOrders[]
	review_on_main: boolean
	review_text: string
	room: string
	street: string
	surname: string
	telphone: string
	user_comment: string
	user_title: string
	user_types: SelOption[]
	user_types_id: string
	user_name: string
	user_pass: string
	user_pass2: string
	vip: boolean
}
