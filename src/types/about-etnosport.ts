import { type ImageItemWithText } from './photos'

export type VidListResponse = {
	vids: VidItem[]
}

export type AboutVids = {
	mainDescs: string
	descs: string
	caption: string
	caption_show: boolean
	logo: ImageItemWithText[]
	photoGallery: ImageItemWithText[]
}

export type VidItem = {
	id: string
	title: string
	is_etnosport: boolean
	is_single: boolean
	is_group: boolean
	hidden: boolean
}

export type VidNewItemResponse = {
	status: string
	id: string
}

export type VidItemInfoResponse = {
	title: string
	desc: string
	rule: string
	is_etnosport: boolean
	is_single: boolean
	is_group: boolean
	users_count: string
	groups_count: string
	hidden: boolean
	mainphoto: ImageItemWithText[]
}

export type EtnosportResponse = {
	anonstext: string
	photos: ImageItemWithText[]
}

export type FunResponse = {
	anonstext: string
	photos: ImageItemWithText[]
}
