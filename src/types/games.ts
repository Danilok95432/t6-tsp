import { type ImageItemWithText } from './photos'

export type GameInfoResponse = {
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

export type GameNewIdResponse = {
	status: string
	id: string
}
