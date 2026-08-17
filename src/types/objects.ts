import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

export type ObjectNews = {
	id: string
	hidden: boolean
	title: string
	tags: string
	main: boolean
	date: Date
}
export type ObjectNewsResponse = {
	news: ObjectNews[]
}

export type ObjectEvents = {
	id: string
	isHidden: boolean
	title: string
	typeEvent: string
	typePart: string
	startDate: Date
	endDate: Date
}

export type ObjectItem = {
	id: string
	hidden: boolean
	title: string
	object_apply_name: string
	object_type_name: string
}

export type PartnersItem = {
	id: string
	hidden: boolean
	title: string
	events: string
	organizationType: string
	partnershipType: string
	priority: string
}

export type ObjectsResponse = {
	description: string
	objects: ObjectItem[]
}

export type ObjectInfoResponse = {
	address: string
	coords: string
	descList: string
	email: string
	mainDescs: string
	object_apply: SelOption[]
	object_types: SelOption[]
	phone: string
	photo: ImageItemWithText[]
	icon: ImageItemWithText[]
	tgName: string
	tgSoc: string
	title: string
	vkName: string
	vkSoc: string
}

export type ObjectNewIdResponse = {
	status: string
	id: string
}

export type ObjectGalleryInfoResponse = {
	photos: ImageItemWithText[]
}

export type pathObjectMap = {
	path_name: string
	path_desc: string
	path_yandex: string
}

export type ObjectMapInfoResponse = {
	map_yandex: string
	hide_paths: boolean
	paths: pathObjectMap[]
}
