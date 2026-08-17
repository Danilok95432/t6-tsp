import { type ImageItemWithText } from './photos'

export type CultureInfoResponse = {
	id: string
	hidden: boolean
	website: string
	title: string
	desc: string
	createdate: Date
	logo: ImageItemWithText[]
	photos: ImageItemWithText[]
	bottomDesc: string
}

export type CultureNewIdResponse = {
	status: string
	id: string
}
