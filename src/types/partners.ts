import { type ImageItemWithText } from './photos'

export type PartnerCheckBoxesInfo = {
	label: string
	value: string
	checked: boolean
}

export type PartnerItem = {
	id: string
	title: string
	itemlink: string
	hidden: boolean
	events_count: string
	partner_vids: string[]
	partner_types: string[]
	sortid: string
}

export type PartnersResponse = {
	partners: PartnerItem[]
}

export type PartnerNewIdResponse = {
	status: string
	id: string
}

export type PartnerInfoResponse = {
	id: string
	title: string
	itemlink: string
	hidden: boolean
	events_count: string
	partner_vids: PartnerCheckBoxesInfo[]
	partner_types: PartnerCheckBoxesInfo[]
	photo?: ImageItemWithText[]
}
