import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

export type OrdersElement = {
	comment: string
	fio: string
	hidden: boolean
	id: string
	items_count: string
	order_date: string
	order_sourse_name: string
	order_status_name: string
	price_delivery: string
	price_items: string
	price_total: string
	tephone: string
}

export type OrderResponse = {
	orders: OrdersElement[]
}

export type OrderNewIdResponse = {
	id: string
}

export type GoodsCart = {
	brand: string
	category: string
	id: string
	item_count: string
	price_item: string
	price_total: string
	title: string
	use_weight: boolean
	item_weight: string
}

export type OrderInfoResponse = {
	delivery_address: string
	delivery_time: string
	hidden: boolean
	id: string
	order_date: string
	order_delivery: SelOption[]
	order_delivery_id: string
	order_items: GoodsCart[]
	order_status: SelOption[]
	order_status_id: string
	price_delivery: string
	price_items: string
	price_total: string
	sdek_point: SelOption[]
	sdek_point_id: string
	order_telphone: string
	order_street: string
	order_surname: string
	order_user_title: string
	order_house: string
	order_secondname: string
	order_dom: string
	order_email: string
	order_firstname: string
	order_address: string
	citys: SelOption[]
	citys_id: string
	city_name: string
	siteusers: SelOption[]
	siteusers_id: string
}

export type SalesElement = {
	id: string
	status: string
	customer: string
	order: string
	deliver: string
	sum: string
	phone: string
	dateOrder: string
	dateSales: string
	amount: string
}

export type SalesResponse = {
	sales: SalesElement[]
}

export type SaleNewIdResponse = {
	id: string
}

export type SaleInfoResponse = {
	title: string
	country: string
	urlMaker: string
	description: string
	mainphoto: ImageItemWithText[]
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	url: string
	hidden: boolean
}

export type RefundsElement = {
	id: string
	status: string
	customer: string
	sumSale: string
	sumRefund: string
	sumPause: string
	phone: string
	dateOrder: string
	dateRefund: string
}

export type RefundResponse = {
	refunds: RefundsElement[]
}

export type RefundNewIdResponse = {
	id: string
}

export type RefundInfoResponse = {
	title: string
	short: string
	full: string
	mainphoto: ImageItemWithText[]
	photo: ImageItemWithText[]
	titleSeo: string
	descriptionSeo: string
	keywords: string
	urlTitle: string
	url: string
	hidden: boolean
}

export type CitysResponse = {
	citys: SelOption[]
}
