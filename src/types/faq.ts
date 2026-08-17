export type FaqItem = {
	id: string
	title: string
	content: string
	hidden: boolean
}

export type FaqResponse = {
	faq: FaqItem[]
}

export type FaqNewIdResponse = {
	id: string
}

export type FaqInfoResponse = {
	title: string
	content: string
	hidden: boolean
}
