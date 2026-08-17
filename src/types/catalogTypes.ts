import { type FileItem } from './files'
import { type ImageItemWithText } from './photos'
import { type MultiSelOption, type SelOption } from './select'

export type TypesElement = {
	id: string
	category: string
	title: string
	createdate: string
	hidden: boolean
}

export type TypeResponse = {
	types: TypesElement[]
}

export type TypeNewIdResponse = {
	id: string
}

export type TypeInfoResponse = {
	title: string
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	url: string
	hidden: boolean
}

export type MakersElement = {
	id: string
	title: string
	country: string
	brand_link: string
	hidden: boolean
}

export type MakerResponse = {
	brands: MakersElement[]
}

export type MakerNewIdResponse = {
	id: string
}

export type MakerInfoResponse = {
	title: string
	country: string
	brand_link: string
	brand_text: string
	mainphoto: ImageItemWithText[]
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	url: string
	hidden: boolean
}

export type SubCategoryItem = { title: string; hidden: boolean; id: string }

export type CategoriesElement = {
	id: string
	title: string
	subcats: SubCategoryItem[]
	use_main: boolean
	main_button: string
	hidden: boolean
}

export type CategoryResponse = {
	contents: CategoriesElement[]
}

export type CategoryNewIdResponse = {
	id: string
}

export type CategoryInfoResponse = {
	title: string
	use_main: boolean
	main_button: string
	short: string
	full: string
	img: ImageItemWithText[]
	img_inside: ImageItemWithText[]
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	url: string
	hidden: boolean
	parent: SelOption[]
}

export type GoodsElement = {
	id: string
	title: string
	artikul: string
	type: string
	maker: string
	category: string
	price: string
	priceSite: string
	hit: boolean
	hidden: boolean

	brand: string
	catalog: string
	item_price: string
	item_price_discount: string
	item_types: string
	use_best: boolean
}

export type GoodsResponse = {
	items: GoodsElement[]
}

export type GoodsNewIdResponse = {
	id: string
}

export type GoodsInfoResponse = {
	id: string
	title: string
	artikul: string
	catalogs: SelOption[]
	catalogs_id: string
	brands: SelOption[]
	brands_id: string
	types: MultiSelOption[]
	item_weight: string
	item_width: string
	item_length: string
	item_height: string
	item_desc: string
	pakage: string
	nal: string
	item_price: string
	item_price_discount: string
	short: string
	full: string
	hidden: boolean
	use_mainslider: boolean
	use_best: boolean
	use_old: boolean
	use_new: boolean
	use_theme: boolean
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	img: ImageItemWithText[]
	images: ImageItemWithText[]
	documents: FileItem[]
}
