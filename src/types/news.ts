import { type ImageItemWithText } from './photos'
import { type MultiSelOption, type SelOption } from './select'

export type NewsItem = {
	id: string
	hidden: boolean
	title: string
	tags: string[]
	main: boolean
	date: Date
}

export type NewsResponse = {
	news: NewsItem[]
}

export type NewsNewIdResponse = {
	status: string
	id: string
}

export type NewsInfoResponse = {
	id: string
	hidden: boolean
	title: string
	tags: string[]
	main: boolean
	itemdate: string
	date: Date
	news_gallerys?: SelOption[]
	photo?: ImageItemWithText[]
	photos: ImageItemWithText[]
	events: SelOption[]
	vidslist: MultiSelOption[]
}
